/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectProps } from '@chakra-ui/react';
import { EncryptionType } from 'casper-storage';
import { OptionsOrGroups, Select, SingleValue } from 'chakra-react-select';

type Option = {
  label: EncryptionType;
  value: EncryptionType;
};

const OPTIONS = [
  {
    label: EncryptionType.Ed25519,
    value: EncryptionType.Ed25519,
  },
  {
    label: EncryptionType.Secp256k1,
    value: EncryptionType.Secp256k1,
  },
];

export type Props = {
  onChange?: (newValue?: EncryptionType) => void;
  value?: EncryptionType;
} & Pick<SelectProps, 'mt'>;

const SelectEncryptionType = ({ onChange, value, ...restProps }: Props) => {
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

export default SelectEncryptionType;
