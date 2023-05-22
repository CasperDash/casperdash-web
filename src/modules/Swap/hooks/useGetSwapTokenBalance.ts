import { useQuery } from '@tanstack/react-query';
import Big from 'big.js';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TokenTypesEnum } from '@/enums/tokenTypes';
import {
  getBalance,
  getErc20Balance,
  GetBalanceResponse,
} from '@/services/friendlyMarket/balance';

type GetErc20BalanceParams = {
  publicKey?: string;
  contractHash?: string;
  type?: TokenTypesEnum;
  decimals?: number;
};

export const useGetSwapTokenBalance = (
  { publicKey, contractHash, type, decimals = 0 }: GetErc20BalanceParams,
  options = {}
) => {
  return useQuery(
    [QueryKeysEnum.SWAP_TOKEN_BALANCE, publicKey, type, contractHash],
    async () => {
      let result: GetBalanceResponse = {
        balance: 0,
      };

      if (type === TokenTypesEnum.ERC20) {
        if (!contractHash) {
          return result;
        }

        result = await getErc20Balance({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          publicKey: publicKey!,
          contractHash,
        });
      }

      if (type === TokenTypesEnum.NATIVE) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result = await getBalance({ publicKey: publicKey! });
      }

      if (result.error) {
        return result;
      }

      return {
        ...result,
        balance:
          Big(result.balance || 0)
            .div(Big(10).pow(decimals))
            .round(decimals)
            .toNumber() || 0,
      };
    },
    {
      ...options,
      enabled: !!publicKey && !!type && !!decimals,
    }
  );
};
