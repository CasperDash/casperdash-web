import React from 'react';

import { Text, Tooltip } from '@chakra-ui/react';

import { startAndEnd } from '@/utils/format';

type Props = {
  value: string;
  startLength?: number;
  endLength?: number;
};
const MiddleTruncatedText = ({
  value,
  startLength = 5,
  endLength = 4,
}: Props) => {
  return (
    <Tooltip label={value}>
      <Text color="black">{startAndEnd(value, startLength, endLength)}</Text>
    </Tooltip>
  );
};

export default MiddleTruncatedText;
