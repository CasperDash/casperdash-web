import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { VStack, HStack, Text } from '@chakra-ui/react';

interface StatProps {
  label?: string;
  value?: string;
  diff?: string;
}

const StatCompact = ({ label, value, diff = undefined }: StatProps) => {
  const diffNumber = diff ? parseFloat(diff) : undefined;

  return (
    <VStack alignItems={'flex-start'} spacing={0}>
      <Text fontSize="12px" color={'gray.500'}>
        {label}
      </Text>
      <HStack spacing={2}>
        <HStack spacing={1}>
          <Text fontWeight={500}>{value}</Text>
        </HStack>
        {diffNumber && (
          <HStack spacing={1}>
            {diffNumber < 0 ? (
              <TriangleDownIcon boxSize={'14px'} color={'red.300'} />
            ) : (
              <TriangleUpIcon boxSize={'14px'} color={'green.300'} />
            )}
            <Text
              fontWeight={500}
              fontSize="sm"
              color={diffNumber < 0 ? 'red.300' : 'green.300'}
            >
              {diff}%
            </Text>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
};

export default StatCompact;
