import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import Input from './components/Input';
import SelectInput from './components/SelectInput';

import { PropSettings, PedProps } from './interfaces';

interface DataById<T> {
  [key: number]: T;
}

interface PropsProps {
  settings: PropSettings[];
  data: PedProps;
  storedData: PedProps;
  handlePropDrawableChange: (prop_id: number, drawable: number) => void;
  handlePropTextureChange: (prop_id: number, texture: number) => void;
  handlePropCollectionChange: (prop_id: number, collection: string) => void;
}

const Props = ({
  settings,
  data,
  storedData,
  handlePropDrawableChange,
  handlePropTextureChange,
  handlePropCollectionChange,
}: PropsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { prop_id, drawable, texture, collections, excludedIndices }) => {
    return { ...object, [prop_id]: { drawable, texture, collections, excludedIndices } };
  }, {} as DataById<Omit<PropSettings, 'prop_id'>>);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.props.title}>
      <Item title={locales.props.hats}>
        {settingsById[0].collections && settingsById[0].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.props.collection || 'Collection'}
              items={settingsById[0].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[0].collections.find(c => c.name === data[0].collection)?.label ||
                  data[0].collection ||
                  'Base Game',
                value: data[0].collection,
              }}
              clientValue={storedData[0].collection}
              onChange={value => handlePropCollectionChange(0, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[0].drawable.min}
            max={settingsById[0].drawable.max}
            defaultValue={data[0].drawable}
            clientValue={storedData[0].drawable}
            onChange={value => handlePropDrawableChange(0, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[0].texture.min}
            max={settingsById[0].texture.max}
            defaultValue={data[0].texture}
            clientValue={storedData[0].texture}
            onChange={value => handlePropTextureChange(0, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.glasses}>
        {settingsById[1].collections && settingsById[1].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.props.collection || 'Collection'}
              items={settingsById[1].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[1].collections.find(c => c.name === data[1].collection)?.label ||
                  data[1].collection ||
                  'Base Game',
                value: data[1].collection,
              }}
              clientValue={storedData[1].collection}
              onChange={value => handlePropCollectionChange(1, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[1].drawable.min}
            max={settingsById[1].drawable.max}
            defaultValue={data[1].drawable}
            clientValue={storedData[1].drawable}
            onChange={value => handlePropDrawableChange(1, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[1].texture.min}
            max={settingsById[1].texture.max}
            defaultValue={data[1].texture}
            clientValue={storedData[1].texture}
            onChange={value => handlePropTextureChange(1, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.ear}>
        {settingsById[2].collections && settingsById[2].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.props.collection || 'Collection'}
              items={settingsById[2].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[2].collections.find(c => c.name === data[2].collection)?.label ||
                  data[2].collection ||
                  'Base Game',
                value: data[2].collection,
              }}
              clientValue={storedData[2].collection}
              onChange={value => handlePropCollectionChange(2, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[2].drawable.min}
            max={settingsById[2].drawable.max}
            defaultValue={data[2].drawable}
            clientValue={storedData[2].drawable}
            onChange={value => handlePropDrawableChange(2, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[2].texture.min}
            max={settingsById[2].texture.max}
            defaultValue={data[2].texture}
            clientValue={storedData[2].texture}
            onChange={value => handlePropTextureChange(2, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.watches}>
        {settingsById[6].collections && settingsById[6].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.props.collection || 'Collection'}
              items={settingsById[6].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[6].collections.find(c => c.name === data[6].collection)?.label ||
                  data[6].collection ||
                  'Base Game',
                value: data[6].collection,
              }}
              clientValue={storedData[6].collection}
              onChange={value => handlePropCollectionChange(6, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[6].drawable.min}
            max={settingsById[6].drawable.max}
            defaultValue={data[6].drawable}
            clientValue={storedData[6].drawable}
            onChange={value => handlePropDrawableChange(6, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[6].texture.min}
            max={settingsById[6].texture.max}
            defaultValue={data[6].texture}
            clientValue={storedData[6].texture}
            onChange={value => handlePropTextureChange(6, value)}
          />
        </FlexWrapper>
      </Item>
      <Item title={locales.props.bracelets}>
        {settingsById[7].collections && settingsById[7].collections.length > 0 && (
          <FlexWrapper>
            <SelectInput
              title={locales.props.collection || 'Collection'}
              items={settingsById[7].collections.map(c => ({ label: c.label, value: c.name }))}
              defaultValue={{
                label:
                  settingsById[7].collections.find(c => c.name === data[7].collection)?.label ||
                  data[7].collection ||
                  'Base Game',
                value: data[7].collection,
              }}
              clientValue={storedData[7].collection}
              onChange={value => handlePropCollectionChange(7, value)}
            />
          </FlexWrapper>
        )}
        <FlexWrapper>
          <Input
            title={locales.props.drawable}
            min={settingsById[7].drawable.min}
            max={settingsById[7].drawable.max}
            defaultValue={data[7].drawable}
            clientValue={storedData[7].drawable}
            onChange={value => handlePropDrawableChange(7, value)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[7].texture.min}
            max={settingsById[7].texture.max}
            defaultValue={data[7].texture}
            clientValue={storedData[7].texture}
            onChange={value => handlePropTextureChange(7, value)}
          />
        </FlexWrapper>
      </Item>
    </Section>
  );
};

export default Props;
