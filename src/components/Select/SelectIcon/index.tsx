import { Box, Flex, SelectProps } from '@chakra-ui/react';
import {
  OptionsOrGroups,
  Select,
  chakraComponents,
  OptionProps,
  OnChangeValue,
  Props,
} from 'chakra-react-select';
import * as _ from 'lodash-es';

export type Option = {
  label: string;
  value: string;
  icon: React.ReactNode;
  amount: number;
};

export type NewValue = OnChangeValue<Option, boolean>;

export type SelectIconProps = {
  onChange?: (newValue: string | undefined) => void;
  value?: string;
  options: Option[];
} & Pick<SelectProps, 'mt'> &
  Partial<Pick<Props<Option, boolean>, 'components'>>;

const customComponents = {
  Option: ({ children, ...props }: OptionProps<Option>) => (
    <chakraComponents.Option {...props}>
      <Flex alignItems="center">
        <Box mr="2">{props.data.icon}</Box>
        {children}
      </Flex>
    </chakraComponents.Option>
  ),
};

const SelectIcon = ({
  onChange,
  value,
  options,
  components,
  ...restProps
}: SelectIconProps) => {
  const foundOption = options.find((option: Option) => option.value === value);
  return (
    <Select
      {...restProps}
      value={foundOption}
      options={options as OptionsOrGroups<Option, never>}
      onChange={(newValue: NewValue) =>
        onChange?.(_.get(newValue, 'value', undefined))
      }
      components={{
        ...customComponents,
        ...components,
      }}
    />
  );
};

export default SelectIcon;
