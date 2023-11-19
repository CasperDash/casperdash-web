import { forwardRef } from 'react';

import {
  InputProps,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
} from '@chakra-ui/react';

type Props = NumberInputFieldProps &
  InputProps & {
    defaultInputValue?: number;
    minInputValue?: number;
  };

const InputNumber = forwardRef(
  ({ defaultInputValue, minInputValue = 0, ...restProps }: Props, ref) => {
    return (
      <NumberInput
        defaultValue={defaultInputValue}
        w="100%"
        min={minInputValue}
      >
        <NumberInputField minH="12" {...restProps} ref={ref} required />
      </NumberInput>
    );
  }
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
