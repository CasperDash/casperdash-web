import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';

import { Flex, useMultiStyleConfig, useRadioGroup } from '@chakra-ui/react';

import { RadioGroupProps } from './type';

export const RadioButtonGroup = ({
  name,
  onChange,
  defaultValue,
  children,
  size,
  variant,
  ...restProps
}: RadioGroupProps) => {
  const radios: ReactElement[] = useMemo(() => {
    const childList: ReactElement[] = [];

    Children.forEach(children, (child: ReactNode) => {
      if (!child || !isValidElement(child)) {
        return;
      }

      childList.push(child);
    });

    return childList;
  }, [children]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  const styles = useMultiStyleConfig('RadioButtons', {
    size,
    variant,
  });

  const group = getRootProps();

  return (
    <Flex gap="4" {...group} {...restProps} __css={styles.radioButtons}>
      {radios.map((child: ReactElement, index: number) => {
        const radioProps = getRadioProps({ value: child.props.value });
        return cloneElement(child, {
          ...radioProps,
          key: `radio-${index}`,
          sx: styles.item,
        });
      })}
    </Flex>
  );
};

export default RadioButtonGroup;
