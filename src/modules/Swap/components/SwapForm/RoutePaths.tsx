import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { useGetCurrentAMMPair } from '@/modules/Swap/hooks/useGetCurrentAMMPair';
import { useGetSwapListTokens } from '@/modules/Swap/hooks/useGetSwapListTokens';
import { PairRouteData } from '@/services/friendlyMarket/amm/type';

const RoutePaths = () => {
  const { data: pair = { isUsingRouting: false }, isLoading } =
    useGetCurrentAMMPair();
  const { data: tokens = [] } = useGetSwapListTokens();
  const pairRoute = pair as PairRouteData;

  if (!pairRoute.isUsingRouting || isLoading) {
    return null;
  }

  return (
    <Flex gap="2">
      {pairRoute.path.map((path, index) => {
        const foundToken = tokens.find(
          (token) => token.contractHash === path.replace('hash-', '')
        );

        return (
          <>
            <Flex key={`path-${path}`} alignItems="center">
              <Box>
                <Image
                  src={foundToken?.logoURI || ''}
                  alt={foundToken?.name || ''}
                  boxSize="16px"
                  mr="8px"
                />
              </Box>
              <Text>{foundToken?.symbol || ''}</Text>
            </Flex>
            {index < pairRoute.path.length - 1 && (
              <Box>
                <ArrowForwardIcon />
              </Box>
            )}
          </>
        );
      })}
    </Flex>
  );
};

export default RoutePaths;
