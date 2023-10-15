import React from 'react';

import { Text, TextProps, Tooltip } from '@chakra-ui/react';

import { startAndEnd } from '@/utils/format';

type Props = {
  value?: string;
  startLength?: number;
  endLength?: number;
  textProps?: TextProps;
};
const MiddleTruncatedText = ({
  value,
  startLength = 5,
  endLength = 4,
  textProps,
}: Props) => {
  if (!value) {
    return null;
  }
  if (startLength + endLength >= value.length) {
    return <Text {...textProps}>{value}</Text>;
  }
  return (
    <Tooltip label={value}>
      <Text {...textProps}>{startAndEnd(value, startLength, endLength)}</Text>
    </Tooltip>
  );
};

export default MiddleTruncatedText;
