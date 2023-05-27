import {
  BoxProps,
  CardProps,
  FlexProps,
  SystemStyleObject,
  UseRadioProps,
} from '@chakra-ui/react';

export type RadioCardProps = {
  children: React.ReactNode;
  sx?: SystemStyleObject;
} & UseRadioProps &
  Pick<FlexProps, 'alignItems'>;

type RadioBaseProps = {
  onChange?: (nextValue: string) => void;
  defaultValue?: string;
  name?: string;
} & Omit<BoxProps, 'onChange'>;

export type RadioButtonsProps = RadioBaseProps & {
  options: string[] | number[];
};

export type RadioGroupProps = RadioBaseProps &
  Pick<CardProps, 'variant' | 'size'>;
