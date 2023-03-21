import React from 'react';

import { Text, Tooltip } from '@chakra-ui/react';

import { startAndEnd } from '@/utils/format';

type Props = {
  value: string;
};
const MiddleTruncatedText = ({ value }: Props) => {
  return (
    <Tooltip label={value}>
      <Text color="black">{startAndEnd(value)}</Text>
    </Tooltip>
  );
};

export default MiddleTruncatedText;
