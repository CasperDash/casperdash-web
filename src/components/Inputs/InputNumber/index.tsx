import { forwardRef } from 'react';

import {
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
} from '@chakra-ui/react';

type Props = NumberInputFieldProps;

const InputNumber = forwardRef((props: Props, ref) => {
  return (
    <NumberInput w="100%" min={0}>
      <NumberInputField minH="12" {...props} ref={ref} required />
    </NumberInput>
  );
});

InputNumber.displayName = 'InputNumber';

export default InputNumber;
