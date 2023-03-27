/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectProps } from '@chakra-ui/react';
import { EncryptionType } from 'casper-storage';
import { OptionsOrGroups, Select, SingleValue } from 'chakra-react-select';

type Option = {
  label: string;
  value: string;
};

const OPTIONS = [
  {
    label: 'CSPR',
    value: 'cspr',
  },
  {
    label: EncryptionType.Secp256k1,
    value: EncryptionType.Secp256k1,
  },
];

export type Props = {
  onChange?: (newValue?: any) => void;
  value?: EncryptionType;
} & Pick<SelectProps, 'mt'>;

const SelectAsset = ({ onChange, value, ...restProps }: Props) => {
  const foundOption = OPTIONS.find((option) => option.value === value);
  return (
    <Select
      {...restProps}
      value={foundOption}
      options={OPTIONS as OptionsOrGroups<Option, any>}
      onChange={(newValue: SingleValue<Option>) => onChange?.(newValue?.value)}
    />
  );
};

export default SelectAsset;
