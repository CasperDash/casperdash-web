import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as _ from 'lodash-es';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getTokensInfo, TokenInfo } from '@/services/casperdash/token';
import { Token } from '@/typings/token';
import { hexToNumber } from '@/utils/currency';

type UseGetTokensParams = {
  tokenAddresses: string[];
  publicKey?: string;
};

export const useGetTokens = (
  { tokenAddresses, publicKey }: UseGetTokensParams,
  options?: Omit<
    UseQueryOptions<
      Token[],
      unknown,
      Token[],
      [QueryKeysEnum.TOKENS, string | undefined, string[]]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeysEnum.TOKENS, publicKey, tokenAddresses],
    async () => {
      if (!publicKey) {
        return [];
      }
      const tokensInfo = await getTokensInfo({
        publicKey,
        tokenAddress: tokenAddresses,
      });

      return tokensInfo.map((tokenInfo: TokenInfo) => {
        const balanceHex = _.get(tokenInfo, 'balance.hex', '0');
        const decimalsHex = _.get(tokenInfo, 'decimals.hex', '0');
        return {
          name: tokenInfo.name,
          tokenAddress: tokenInfo.address,
          symbol: tokenInfo.symbol,
          balance: hexToNumber(balanceHex, decimalsHex),
          decimals: parseInt(decimalsHex, 16),
        };
      });
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
