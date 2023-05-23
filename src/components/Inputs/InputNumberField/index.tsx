import { NumberInput, NumberInputField } from '@chakra-ui/react';
import { Control, Controller, ControllerProps } from 'react-hook-form';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  max?: number;
  min?: number;
} & Omit<ControllerProps, 'render' | 'control'>;

const InputNumberField = ({ min, max, name, ...restProps }: Props) => {
  return (
    <Controller
      name={name}
      {...restProps}
      render={({ field: { onChange, value, onBlur } }) => {
        return (
          <NumberInput
            value={value}
            min={min}
            max={max}
            onChange={(val: string) => {
              onChange(parseFloat(val) || 0);
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
