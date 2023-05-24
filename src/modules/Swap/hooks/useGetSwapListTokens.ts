import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash-es';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { useAccount } from '@/hooks/useAccount';
import { getListTokens, Token } from '@/services/friendlyMarket/tokens';

export const MAP_COINGECKO_IDS = {
  wcspr: 'casper-network',
  cspr: 'casper-network',
  deth: 'ethereum',
  dusdc: 'usd-coin',
  dusdt: 'tether',
  dai: 'dai',
  frax: 'frax',
};

export const useGetSwapListTokens = (options = {}) => {
  const { publicKey = '' } = useAccount();
  return useQuery(
    [QueryKeysEnum.SWAP_TOKENS],
    async () => {
      const tokens = await getListTokens();

      return tokens.map((token: Token) => {
        const { symbol = '' } = token;
        const coingeckoId = _.get(
          MAP_COINGECKO_IDS,
          symbol.toLowerCase(),
          undefined
        );

        return {
          ...token,
          coingeckoId,
        };
      });
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
