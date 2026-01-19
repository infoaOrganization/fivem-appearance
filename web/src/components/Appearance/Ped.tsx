import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import SelectInput from './components/SelectInput';

import { PedSettings } from './interfaces';

interface PedProps {
  settings: PedSettings;
  storedData: string;
  data: string;
  handleModelChange: (value: string) => void;
}

const Ped = ({ settings, storedData, data, handleModelChange }: PedProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.ped.title}>
      <Item>
        <SelectInput
          title={locales.ped.model}
          items={settings.model.items}
          defaultValue={{ label: settings.model.items[0].label, model: settings.model.items[0].model }}
          clientValue={storedData}
          onChange={value => handleModelChange(value)}
        />
      </Item>
    </Section>
  );
};

export default Ped;
