import {
  Box,
  useRadio,
  // useStyles,
} from '@chakra-ui/react';

import { RadioCardProps } from './type';

export const RadioButton = ({ sx, ...props }: RadioCardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box {...checkbox} sx={sx}>
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioButton;
