import { NumberInput, NumberInputField } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  name: string;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
};

const InputNumberField = ({
  min,
  max,
  name,
  control,
  onChange,
  ...restProps
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: onChangeForm, value, onBlur } }) => {
        return (
          <NumberInput
            {...restProps}
            value={value}
            min={min}
            max={max}
            onChange={(val: string) => {
              const valNumber = parseFloat(val) || 0;
              onChangeForm(valNumber);
              onChange?.(valNumber);
            }}
            onBlur={onBlur}
          >
            <NumberInputField />
          </NumberInput>
        );
      }}
    ></Controller>
  );
};

export default InputNumberField;
