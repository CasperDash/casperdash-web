import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { HStack, Box, Text } from '@chakra-ui/react';

import iconCSPR from '@/assets/img/icon--cspr.png';

interface TokenValueProps {
  urlIcon?: string;
  value: string;
  token?: string;
  diff?: number;
}

const TokenValue = ({
  urlIcon,
  value,
  token,
  diff = undefined,
}: TokenValueProps) => {
  return (
    <HStack spacing={2}>
      <Box w={4}>
        <img src={urlIcon} />
      </Box>
      <Box>
        <HStack spacing={1}>
          <Text fontWeight={500}>{value}</Text>
          <Text opacity={0.5} fontWeight={500}>
            {token}
          </Text>
        </HStack>
      </Box>
      {diff && (
        <HStack spacing={1}>
          {diff < 0 ? (
            <TriangleDownIcon boxSize={'14px'} color={'red.500'} />
          ) : (
            <TriangleUpIcon boxSize={'14px'} color={'green.500'} />
          )}
          <Text
            fontWeight={500}
            fontSize="sm"
            color={diff < 0 ? 'red.500' : 'green.500'}
          >
            {diff.toFixed(2)}%
          </Text>
        </HStack>
      )}
    </HStack>
  );
};

export const CSPRValue = ({ value, diff }: TokenValueProps) => (
  <TokenValue token="CSPR" value={value} urlIcon={iconCSPR} diff={diff} />
);

export default TokenValue;
