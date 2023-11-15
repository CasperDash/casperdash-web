import React from 'react';

import {
  PlacementWithLogical,
  Text,
  TextProps,
  Tooltip,
} from '@chakra-ui/react';

import { startAndEnd } from '@/utils/format';

type Props = {
  value?: string;
  startLength?: number;
  endLength?: number;
  textProps?: TextProps;
  placement?: PlacementWithLogical;
  isCopy?: boolean;
};
const MiddleTruncatedText = ({
  value,
  startLength = 5,
  endLength = 7,
  textProps,
  placement,
}: Props) => {
  if (!value) {
    return null;
  }
  if (startLength + endLength >= value.length) {
    return <Text {...textProps}>{value}</Text>;
  }

  return (
    <Tooltip label={value} placement={placement}>
      <Text {...textProps}>{startAndEnd(value, startLength, endLength)}</Text>
    </Tooltip>
  );
};

export default MiddleTruncatedText;
