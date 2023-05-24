import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { useGetCurrentAMMPair } from '@/modules/Swap/hooks/useGetCurrentAMMPair';
import { useGetSwapListTokens } from '@/modules/Swap/hooks/useGetSwapListTokens';
import { PairData, PairRouteData } from '@/services/friendlyMarket/amm/type';

const RoutePaths = () => {
  const { data: pair = { isUsingRouting: false } } = useGetCurrentAMMPair();
  const { data: tokens = [] } = useGetSwapListTokens();
  const pairRoute = pair as PairRouteData;

  let paths: string[] = [];
  if (pairRoute.isUsingRouting) {
    paths = pairRoute.path;
  } else if (pair) {
    const simplePair = pair as PairData;
    paths = [
      simplePair.token0Model.contractHash,
      simplePair.token1Model.contractHash,
    ];
  }

  return (
    <Flex gap="2">
      {paths.map((path, index) => {
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
            {index < paths.length - 1 && (
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
