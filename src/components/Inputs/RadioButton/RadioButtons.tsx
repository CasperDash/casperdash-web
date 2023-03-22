import { Box, useMultiStyleConfig, useRadioGroup } from '@chakra-ui/react';

import RadioButton from '.';
import { RadioButtonsProps } from './type';

const RadioButtons = ({
  name,
  onChange,
  options,
  defaultValue,
  ...restProps
}: RadioButtonsProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  const styles = useMultiStyleConfig('RadioButtons', {
    size: 'md',
    variant: 'bold',
  });

  const group = getRootProps();

  return (
    <Box gap="4" {...group} {...restProps} __css={styles.radioButtons}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioButton key={value} {...radio}>
            {value}
          </RadioButton>
        );
      })}
    </Box>
  );
};

export default RadioButtons;
