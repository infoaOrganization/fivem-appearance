import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import SelectInput from './components/SelectInput';

import { PedSettings } from './interfaces';
import { useMemo, useRef } from 'react';

interface PedProps {
  settings: PedSettings;
  storedData: string;
  data: string;
  handleModelChange: (value: string) => void;
}

const Ped = ({ settings, storedData, data, handleModelChange }: PedProps) => {
  const key = JSON.stringify(settings.model.items.map(({ label, model }) => [label, model])) // deterministic
  const optionsRef = useRef<{
    key: string;
    value: { label: string; value: string }[];
  } | null>(null);

  if (!optionsRef.current || optionsRef.current.key !== key) {
    // console.log("changed to " + key); // XXX: reference not changed but 'defaultValue' is rendered; very poor design
    // TODO: change defaultValue on change
    optionsRef.current = {
      key,
      value: settings.model.items.map(({ label, model }) => ({ label, value: model })),
    };
  }

  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.ped.title}>
      <Item>
        <SelectInput
          title={locales.ped.model}
          items={optionsRef.current?.value}
          defaultValue={optionsRef.current?.value[0]}
          clientValue={storedData}
          onChange={value => handleModelChange(value)}
        />
      </Item>
    </Section>
  );
};

export default Ped;
