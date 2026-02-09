import { Delay, isPedFreemodeModel, getPedStats, setPedStats } from './utils';

import {
  FACE_FEATURES,
  HEAD_OVERLAYS,
  HAIR_DECORATIONS,
  PED_COMPONENTS_IDS,
  PED_PROPS_IDS,
  EYE_COLORS,
} from './constants';

import Customization, { getPedTattoos, setPedTattoos } from './modules/customization';

const exp = (global as any).exports;

const GET_PED_HEAD_BLEND_DATA = '0x2746bd9d88c5c5d0';
const AUTOMATIC_FADE = Boolean(Number(GetConvar('fivem-appearance:automaticFade', '1')));

export const totalTattoos: TattooList = JSON.parse(
  LoadResourceFile(GetCurrentResourceName(), 'tattoos.json'),
);

let pedModels: { label: string; model: string }[] = [];

let pedModelsByHash: Record<number, string> = {};

export function setPedModels(models: { label: string; model: string }[]): void {
  pedModels = models;
  pedModelsByHash = models.reduce((object, model) => {
    return { ...object, [GetHashKey(model.model)]: model.model };
  }, {});
}

export function getPedModels(): { label: string; model: string }[] {
  return pedModels;
}

// Collection labels and excluded indices
let collectionLabels: { name: string; label: string }[] = [{ name: '', label: 'Base Game' }];

let excludedComponentIndices: Record<string, Record<number, number[]>> = {};
let excludedPropIndices: Record<string, Record<number, number[]>> = {};

export function setCollectionLabels(labels: { name: string; label: string }[]): void {
  collectionLabels = labels;
}

export function getCollectionLabels(): { name: string; label: string }[] {
  return collectionLabels;
}

export function getCollectionLabel(collectionName: string): string {
  return (
    collectionLabels.find(l => l.name === collectionName)?.label || collectionName || 'Base Game'
  );
}

export function setExcludedComponentIndices(
  config: Record<string, Record<number, number[]>>,
): void {
  excludedComponentIndices = config;
}

export function getExcludedComponentIndices(): Record<string, Record<number, number[]>> {
  return excludedComponentIndices;
}

export function setExcludedPropIndices(config: Record<string, Record<number, number[]>>): void {
  excludedPropIndices = config;
}

export function getExcludedPropIndices(): Record<string, Record<number, number[]>> {
  return excludedPropIndices;
}

function getPedModel(ped: number): string {
  return pedModelsByHash[GetEntityModel(ped)];
}

function getPedComponents(ped: number): PedComponents {
  const components: PedComponents = {};
  const isFreemode = isPedFreemodeModel(ped);

  PED_COMPONENTS_IDS.forEach(componentId => {
    let collection = '';
    let drawable = GetPedDrawableVariation(ped, componentId);

    if (isFreemode) {
      collection = GetPedDrawableVariationCollectionName(ped, componentId) || '';
      drawable = GetPedDrawableVariationCollectionLocalIndex(ped, componentId);
    }

    components[componentId] = {
      collection,
      drawable,
      texture: GetPedTextureVariation(ped, componentId),
    };
  });

  return components;
}

function getPedProps(ped: number): PedProps {
  const props: PedProps = {};
  const isFreemode = isPedFreemodeModel(ped);

  PED_PROPS_IDS.forEach(propId => {
    let collection = '';
    let drawable = GetPedPropIndex(ped, propId);

    if (isFreemode) {
      const globalIndex = drawable;
      collection = GetPedCollectionNameFromProp(ped, propId, globalIndex) || '';
      drawable = GetPedCollectionLocalIndexFromProp(ped, propId, globalIndex);
    }

    props[propId] = {
      collection,
      drawable,
      texture: GetPedPropTextureIndex(ped, propId),
    };
  });

  return props;
}

function getPedHeadBlend(ped: number): PedHeadBlend {
  // int, int, int, int, int, int, float, float, float, bool
  const buffer = new ArrayBuffer(80);

  global.Citizen.invokeNative(GET_PED_HEAD_BLEND_DATA, ped, new Uint32Array(buffer));

  /*   
    0: shapeFirst,
    2: shapeSecond,
    4: shapeThird,
    6: skinFirst,
    8: skinSecond,
    10: skinThird,
    18: isParent,
  */
  const { 0: shapeFirst, 2: shapeSecond, 6: skinFirst, 8: skinSecond } = new Uint32Array(buffer);

  // 0: shapeMix, 2: skinMix, 4: thirdMix
  const { 0: shapeMix, 2: skinMix } = new Float32Array(buffer, 48);

  const normalizedShapeMix = parseFloat(shapeMix.toFixed(1));
  const normalizedSkinMix = parseFloat(skinMix.toFixed(1));

  return {
    shapeFirst,
    shapeSecond,
    skinFirst,
    skinSecond,
    shapeMix: normalizedShapeMix,
    skinMix: normalizedSkinMix,
  };
}

function getPedFaceFeatures(ped: number): PedFaceFeatures {
  const faceFeatures = FACE_FEATURES.reduce((object, feature, index) => {
    const normalizedValue = parseFloat(GetPedFaceFeature(ped, index).toFixed(1));

    return { ...object, [feature]: normalizedValue };
  }, {} as PedFaceFeatures);

  return faceFeatures;
}

function getPedHeadOverlays(ped: number): PedHeadOverlays {
  const headOverlays = HEAD_OVERLAYS.reduce((object, overlay, index) => {
    // success, value, colorType, firstColor, secondColor, opacity
    const [, value, , firstColor, , opacity] = GetPedHeadOverlayData(ped, index);

    const hasOverlay = value !== 255;

    const safeValue = hasOverlay ? value : 0;
    const normalizedOpacity = hasOverlay ? parseFloat(opacity.toFixed(1)) : 0;

    return {
      ...object,
      [overlay]: { style: safeValue, opacity: normalizedOpacity, color: firstColor },
    };
  }, {} as PedHeadOverlays);

  return headOverlays;
}

function getPedHair(ped: number): PedHair {
  return {
    style: GetPedDrawableVariation(ped, 2),
    color: GetPedHairColor(ped),
    highlight: GetPedHairHighlightColor(ped),
  };
}

function getPedHairDecorationType(ped: number): 'male' | 'female' {
  const pedModel = GetEntityModel(ped);

  let hairDecorationType: 'male' | 'female';

  if (pedModel === GetHashKey('mp_m_freemode_01')) {
    hairDecorationType = 'male';
  } else if (pedModel === GetHashKey('mp_f_freemode_01')) {
    hairDecorationType = 'female';
  }

  return hairDecorationType;
}

function getPedHairDecoration(ped: number, hairStyle: number): HairDecoration {
  const hairDecorationType = getPedHairDecorationType(ped);

  if (!hairDecorationType) return;

  const hairDecoration = HAIR_DECORATIONS[hairDecorationType].find(
    decoration => decoration.id === hairStyle,
  );

  return hairDecoration;
}

export function getPedAppearance(ped: number): PedAppearance {
  const eyeColor = GetPedEyeColor(ped);

  return {
    model: getPedModel(ped) || 'mp_m_freemode_01',
    headBlend: getPedHeadBlend(ped),
    faceFeatures: getPedFaceFeatures(ped),
    headOverlays: getPedHeadOverlays(ped),
    components: getPedComponents(ped),
    props: getPedProps(ped),
    hair: getPedHair(ped),
    eyeColor: eyeColor < EYE_COLORS.length ? eyeColor : 0,
    tattoos: getPedTattoos(),
  };
}

export async function setPlayerModel(model: string): Promise<void> {
  if (!model) return;

  if (!IsModelInCdimage(model)) return;

  RequestModel(model);

  while (!HasModelLoaded(model)) {
    await Delay(0);
  }

  const [currentHealth, currentArmour] = getPedStats();

  SetPlayerModel(PlayerId(), model);
  SetModelAsNoLongerNeeded(model);

  const playerPed = PlayerPedId();

  if (isPedFreemodeModel(playerPed)) {
    SetPedDefaultComponentVariation(playerPed);
    SetPedHeadBlendData(playerPed, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
  }

  setPedStats(currentHealth, currentArmour);
}

export function setPedHeadBlend(ped: number, headBlend: PedHeadBlend): void {
  if (!headBlend) return;

  const { shapeFirst, shapeSecond, shapeMix, skinFirst, skinSecond, skinMix } = headBlend;

  if (isPedFreemodeModel(ped)) {
    SetPedHeadBlendData(
      ped,
      shapeFirst,
      shapeSecond,
      0,
      skinFirst,
      skinSecond,
      0,
      shapeMix,
      skinMix,
      0,
      false,
    );
  }
}

export function setPedFaceFeatures(ped: number, faceFeatures: PedFaceFeatures): void {
  if (!faceFeatures) return;

  FACE_FEATURES.forEach((key, index) => {
    const faceFeature = faceFeatures[key];

    SetPedFaceFeature(ped, index, faceFeature);
  });
}

export function setPedHeadOverlays(ped: number, headOverlays: PedHeadOverlays): void {
  if (!headOverlays) return;

  HEAD_OVERLAYS.forEach((key, index) => {
    const headOverlay: PedHeadOverlayValue = headOverlays[key];

    SetPedHeadOverlay(ped, index, headOverlay.style, headOverlay.opacity);

    if (headOverlay.color || headOverlay.color === 0) {
      let colorType = 1;

      const isMakeupColor = {
        blush: true,
        lipstick: true,
        makeUp: true,
      };

      if (isMakeupColor[key]) {
        colorType = 2;
      }
      SetPedHeadOverlayColor(ped, index, colorType, headOverlay.color, headOverlay.secondColor);
    }
  });
}

export function setPedHair(ped: number, hair: PedHair): void {
  if (!hair) return;

  const { style, color, highlight } = hair;

  SetPedComponentVariation(ped, 2, style, 0, 0);

  SetPedHairColor(ped, color, highlight);

  if (AUTOMATIC_FADE) {
    const hairDecoration = getPedHairDecoration(ped, style);

    ClearPedDecorations(ped);

    if (hairDecoration) {
      const { collection, overlay } = hairDecoration;

      AddPedDecorationFromHashes(ped, GetHashKey(collection), GetHashKey(overlay));
    }
  }
}

export function setPedEyeColor(ped: number, eyeColor: number): void {
  if (!eyeColor) return;

  SetPedEyeColor(ped, eyeColor);
}

export function setPedComponent(ped: number, componentId: number, value: PedComponentValue): void {
  if (!value) return;

  const { collection, drawable, texture } = value;

  const excludedFromFreemodeModels: Record<number, boolean> = {
    0: true,
    2: true,
  };

  if (excludedFromFreemodeModels[componentId] && isPedFreemodeModel(ped)) {
    return;
  }

  if (isPedFreemodeModel(ped)) {
    SetPedCollectionComponentVariation(ped, componentId, collection, drawable, texture, 0);
  } else {
    SetPedComponentVariation(ped, componentId, drawable, texture, 0);
  }
}

export function setPedComponents(ped: number, components: PedComponents): void {
  if (!components) return;

  Object.entries(components).forEach(([id, value]) => {
    setPedComponent(ped, Number(id), value);
  });
}

export function setPedProp(ped: number, propId: number, value: PedPropValue): void {
  if (!value) return;

  const { collection, drawable, texture } = value;

  if (drawable === -1) {
    ClearPedProp(ped, propId);
    return;
  }

  if (isPedFreemodeModel(ped)) {
    SetPedCollectionPropIndex(ped, propId, collection, drawable, texture, false);
  } else {
    SetPedPropIndex(ped, propId, drawable, texture, false);
  }
}

export function setPedProps(ped: number, props: PedProps): void {
  if (!props) return;

  Object.entries(props).forEach(([id, value]) => {
    setPedProp(ped, Number(id), value);
  });
}

export async function setPlayerAppearance(appearance: PedAppearance): Promise<void> {
  if (!appearance) return;

  const {
    model,
    components,
    props,
    headBlend,
    faceFeatures,
    headOverlays,
    hair,
    eyeColor,
    tattoos,
  } = appearance;

  await setPlayerModel(model);

  const playerPed = PlayerPedId();

  setPedComponents(playerPed, components);

  setPedProps(playerPed, props);

  if (headBlend) {
    setPedHeadBlend(playerPed, headBlend);
  }

  if (faceFeatures) {
    setPedFaceFeatures(playerPed, faceFeatures);
  }

  if (headOverlays) {
    setPedHeadOverlays(playerPed, headOverlays);
  }

  if (hair) {
    setPedHair(playerPed, hair);
  }

  if (eyeColor) {
    setPedEyeColor(playerPed, eyeColor);
  }

  if (tattoos) {
    setPedTattoos(playerPed, tattoos);
  }
}

function setPedAppearance(ped: number, appearance: Omit<PedAppearance, 'model'>): void {
  if (!appearance) return;

  const { components, props, headBlend, faceFeatures, headOverlays, hair, eyeColor, tattoos } =
    appearance;

  setPedComponents(ped, components);

  setPedProps(ped, props);

  if (headBlend) {
    setPedHeadBlend(ped, headBlend);
  }

  if (faceFeatures) {
    setPedFaceFeatures(ped, faceFeatures);
  }

  if (headOverlays) {
    setPedHeadOverlays(ped, headOverlays);
  }

  if (hair) {
    setPedHair(ped, hair);
  }

  if (eyeColor) {
    setPedEyeColor(ped, eyeColor);
  }

  if (tattoos) {
    setPedTattoos(ped, tattoos);
  }
}

(() => {
  Customization.loadModule();

  exp('getPedModel', getPedModel);
  exp('getPedModels', getPedModels);
  exp('getPedComponents', getPedComponents);
  exp('getPedProps', getPedProps);
  exp('getPedHeadBlend', getPedHeadBlend);
  exp('getPedFaceFeatures', getPedFaceFeatures);
  exp('getPedHeadOverlays', getPedHeadOverlays);
  exp('getPedHair', getPedHair);
  exp('getPedTattoos', getPedTattoos);
  exp('getPedAppearance', getPedAppearance);

  exp('setPedModels', setPedModels);
  exp('setCollectionLabels', setCollectionLabels);
  exp('setExcludedComponentIndices', setExcludedComponentIndices);
  exp('setExcludedPropIndices', setExcludedPropIndices);
  exp('setPlayerModel', setPlayerModel);
  exp('setPedHeadBlend', setPedHeadBlend);
  exp('setPedFaceFeatures', setPedFaceFeatures);
  exp('setPedHeadOverlays', setPedHeadOverlays);
  exp('setPedHair', setPedHair);
  exp('setPedEyeColor', setPedEyeColor);
  exp('setPedComponent', setPedComponent);
  exp('setPedComponents', setPedComponents);
  exp('setPedProp', setPedProp);
  exp('setPedProps', setPedProps);
  exp('setPedTattoos', setPedTattoos);
  exp('setPlayerAppearance', setPlayerAppearance);
  exp('setPedAppearance', setPedAppearance);
})();
