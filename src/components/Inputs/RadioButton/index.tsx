import {
  Box,
  Flex,
  FlexProps,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';

type RadioCardProps = {
  children: React.ReactNode;
} & UseRadioProps;

const RadioCard = (props: RadioCardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="3xl"
        boxShadow="md"
        textAlign="center"
        w="103px"
        _checked={{
          bg: 'blue.300',
          color: 'white',
          borderColor: 'blue.300',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

type Props = {
  onChange?: (nextValue: string) => void;
  options: string[];
  defaultValue?: string;
  name?: string;
} & FlexProps;
const RadioButtons = ({
  name,
  onChange,
  options,
  defaultValue,
  ...restProps
}: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  const group = getRootProps();

  return (
    <Flex gap="4" {...group} {...restProps}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </Flex>
  );
};

export default RadioButtons;
