import { useMemo } from 'react';
import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import Input from './components/Input';
import SelectInput from './components/SelectInput';

import { ComponentSettings, PedComponents } from './interfaces';
import { createIndexMapping, actualToUiIndex, uiToActualIndex } from './utils/indexMapping';

interface DataById<T> {
  [key: number]: T;
}

interface ComponentsProps {
  settings: ComponentSettings[];
  data: PedComponents;
  storedData: PedComponents;
  handleComponentDrawableChange: (component_id: number, drawable: number) => void;
  handleComponentTextureChange: (component_id: number, texture: number) => void;
  handleComponentCollectionChange: (component_id: number, collection: string) => void;
}

const Components = ({
  settings,
  data,
  storedData,
  handleComponentDrawableChange,
  handleComponentTextureChange,
  handleComponentCollectionChange,
}: ComponentsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { component_id, drawable, texture, collections, excludedIndices }) => {
    return { ...object, [component_id]: { drawable, texture, collections, excludedIndices } };
  }, {} as DataById<Omit<ComponentSettings, 'component_id'>>);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.components.title}>
      <Item title={locales.components.mask}>
        {settingsById[1].collections && settingsById[1].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[1].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[1].collections.find(c => c.name === data[1].collection)?.label ||
                  data[1].collection ||
                  'Base Game',
                value: data[1].collection,
              }}
              clientValue={storedData[1].collection}
              onChange={value => handleComponentCollectionChange(1, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[1].drawable.min}
            max={settingsById[1].drawable.max}
            defaultValue={data[1].drawable}
            clientValue={storedData[1].drawable}
            onChange={value => handleComponentDrawableChange(1, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[1].texture.min}
            max={settingsById[1].texture.max}
            defaultValue={data[1].texture}
            clientValue={storedData[1].texture}
            onChange={value => handleComponentTextureChange(1, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.upperBody}>
        {settingsById[3].collections && settingsById[3].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[3].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[3].collections.find(c => c.name === data[3].collection)?.label ||
                  data[3].collection ||
                  'Base Game',
                value: data[3].collection,
              }}
              clientValue={storedData[3].collection}
              onChange={value => handleComponentCollectionChange(3, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[3].drawable.min}
            max={settingsById[3].drawable.max}
            defaultValue={data[3].drawable}
            clientValue={storedData[3].drawable}
            onChange={value => handleComponentDrawableChange(3, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[3].texture.min}
            max={settingsById[3].texture.max}
            defaultValue={data[3].texture}
            clientValue={storedData[3].texture}
            onChange={value => handleComponentTextureChange(3, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.lowerBody}>
        {settingsById[4].collections && settingsById[4].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[4].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[4].collections.find(c => c.name === data[4].collection)?.label ||
                  data[4].collection ||
                  'Base Game',
                value: data[4].collection,
              }}
              clientValue={storedData[4].collection}
              onChange={value => handleComponentCollectionChange(4, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[4].drawable.min}
            max={settingsById[4].drawable.max}
            defaultValue={data[4].drawable}
            clientValue={storedData[4].drawable}
            onChange={value => handleComponentDrawableChange(4, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[4].texture.min}
            max={settingsById[4].texture.max}
            defaultValue={data[4].texture}
            clientValue={storedData[4].texture}
            onChange={value => handleComponentTextureChange(4, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.bags}>
        {settingsById[5].collections && settingsById[5].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[5].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[5].collections.find(c => c.name === data[5].collection)?.label ||
                  data[5].collection ||
                  'Base Game',
                value: data[5].collection,
              }}
              clientValue={storedData[5].collection}
              onChange={value => handleComponentCollectionChange(5, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[5].drawable.min}
            max={settingsById[5].drawable.max}
            defaultValue={data[5].drawable}
            clientValue={storedData[5].drawable}
            onChange={value => handleComponentDrawableChange(5, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[5].texture.min}
            max={settingsById[5].texture.max}
            defaultValue={data[5].texture}
            clientValue={storedData[5].texture}
            onChange={value => handleComponentTextureChange(5, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.shoes}>
        {settingsById[6].collections && settingsById[6].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[6].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[6].collections.find(c => c.name === data[6].collection)?.label ||
                  data[6].collection ||
                  'Base Game',
                value: data[6].collection,
              }}
              clientValue={storedData[6].collection}
              onChange={value => handleComponentCollectionChange(6, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[6].drawable.min}
            max={settingsById[6].drawable.max}
            defaultValue={data[6].drawable}
            clientValue={storedData[6].drawable}
            onChange={value => handleComponentDrawableChange(6, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[6].texture.min}
            max={settingsById[6].texture.max}
            defaultValue={data[6].texture}
            clientValue={storedData[6].texture}
            onChange={value => handleComponentTextureChange(6, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.scarfAndChains}>
        {settingsById[7].collections && settingsById[7].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[7].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[7].collections.find(c => c.name === data[7].collection)?.label ||
                  data[7].collection ||
                  'Base Game',
                value: data[7].collection,
              }}
              clientValue={storedData[7].collection}
              onChange={value => handleComponentCollectionChange(7, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[7].drawable.min}
            max={settingsById[7].drawable.max}
            defaultValue={data[7].drawable}
            clientValue={storedData[7].drawable}
            onChange={value => handleComponentDrawableChange(7, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[7].texture.min}
            max={settingsById[7].texture.max}
            defaultValue={data[7].texture}
            clientValue={storedData[7].texture}
            onChange={value => handleComponentTextureChange(7, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.shirt}>
        {settingsById[8].collections && settingsById[8].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[8].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[8].collections.find(c => c.name === data[8].collection)?.label ||
                  data[8].collection ||
                  'Base Game',
                value: data[8].collection,
              }}
              clientValue={storedData[8].collection}
              onChange={value => handleComponentCollectionChange(8, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[8].drawable.min}
            max={settingsById[8].drawable.max}
            defaultValue={data[8].drawable}
            clientValue={storedData[8].drawable}
            onChange={value => handleComponentDrawableChange(8, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[8].texture.min}
            max={settingsById[8].texture.max}
            defaultValue={data[8].texture}
            clientValue={storedData[8].texture}
            onChange={value => handleComponentTextureChange(8, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.bodyArmor}>
        {settingsById[9].collections && settingsById[9].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[9].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[9].collections.find(c => c.name === data[9].collection)?.label ||
                  data[9].collection ||
                  'Base Game',
                value: data[9].collection,
              }}
              clientValue={storedData[9].collection}
              onChange={value => handleComponentCollectionChange(9, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[9].drawable.min}
            max={settingsById[9].drawable.max}
            defaultValue={data[9].drawable}
            clientValue={storedData[9].drawable}
            onChange={value => handleComponentDrawableChange(9, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[9].texture.min}
            max={settingsById[9].texture.max}
            defaultValue={data[9].texture}
            clientValue={storedData[9].texture}
            onChange={value => handleComponentTextureChange(9, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.decals}>
        {settingsById[10].collections && settingsById[10].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[10].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[10].collections.find(c => c.name === data[10].collection)?.label ||
                  data[10].collection ||
                  'Base Game',
                value: data[10].collection,
              }}
              clientValue={storedData[10].collection}
              onChange={value => handleComponentCollectionChange(10, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[10].drawable.min}
            max={settingsById[10].drawable.max}
            defaultValue={data[10].drawable}
            clientValue={storedData[10].drawable}
            onChange={value => handleComponentDrawableChange(10, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[10].texture.min}
            max={settingsById[10].texture.max}
            defaultValue={data[10].texture}
            clientValue={storedData[10].texture}
            onChange={value => handleComponentTextureChange(10, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.components.jackets}>
        {settingsById[11].collections && settingsById[11].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.components.collection || 'Collection'}
              items={settingsById[11].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[11].collections.find(c => c.name === data[11].collection)?.label ||
                  data[11].collection ||
                  'Base Game',
                value: data[11].collection,
              }}
              clientValue={storedData[11].collection}
              onChange={value => handleComponentCollectionChange(11, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.components.drawable}
            min={settingsById[11].drawable.min}
            max={settingsById[11].drawable.max}
            defaultValue={data[11].drawable}
            clientValue={storedData[11].drawable}
            onChange={value => handleComponentDrawableChange(11, value)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[11].texture.min}
            max={settingsById[11].texture.max}
            defaultValue={data[11].texture}
            clientValue={storedData[11].texture}
            onChange={value => handleComponentTextureChange(11, value)}
          />
        </FlexWrapper>
      </Item>
    </Section>
  );
};

export default Components;
