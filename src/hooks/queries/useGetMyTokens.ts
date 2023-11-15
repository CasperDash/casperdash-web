import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as _ from 'lodash-es';

import { useAccount } from '../useAccount';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getTokensInfo } from '@/services/casperdash/token';
import { Token } from '@/typings/token';
import { formatBalanceFromHex } from '@/utils/currency';
import { getBase64IdentIcon } from '@/utils/icon';
import { TokenStorage } from '@/utils/localForage/token';

export const useGetMyTokens = (
  options?: Omit<
    UseQueryOptions<
      Token[],
      unknown,
      Token[],
      [QueryKeysEnum.MY_TOKENS, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const { publicKey } = useAccount();

  return useQuery(
    [QueryKeysEnum.MY_TOKENS, publicKey],
    async () => {
      if (!publicKey) {
        return [];
      }
      const tokenStorage = new TokenStorage(publicKey);
      const tokens = await tokenStorage.getTokens();
      const tokenAddresses = _.map(tokens, 'tokenAddress');
      const tokensInfo = await getTokensInfo({
        publicKey,
        tokenAddress: tokenAddresses,
      });

      if (!tokens) {
        return [];
      }

      return _.map(tokens, (token) => {
        const tokenInfo = _.find(tokensInfo, {
          address: token.tokenAddress,
        });
        return {
          ...token,
          balance: formatBalanceFromHex(
            _.get(tokenInfo, 'balance.hex', '0'),
            _.get(tokenInfo, 'decimals.hex', '0')
          ),
          totalSupply: formatBalanceFromHex(
            _.get(tokenInfo, 'total_supply.hex', '0'),
            _.get(tokenInfo, 'decimals.hex', '0')
          ),
          icon: getBase64IdentIcon(token.tokenAddress),
        };
      });
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
