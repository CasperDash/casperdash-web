import * as _ from 'lodash-es';

import { useGetTokens } from '@/hooks/queries/useGetTokens';
import { useAccount } from '@/hooks/useAccount';
import { useGetSwapListTokens } from '@/modules/Swap/hooks/useGetSwapListTokens';
import { Token as Token } from '@/typings/token';

export const useGetBalanceTokens = () => {
  const { publicKey } = useAccount();
  const { data: listTokens = [] } = useGetSwapListTokens();

  const { data: tokenInfos } = useGetTokens({
    tokenAddresses: _.map(listTokens, 'contractHash'),
    publicKey,
  });

  const fetchedTokens = _.map(listTokens, (token) => {
    const tokenInfo = tokenInfos?.find(
      (fToken: Token) => fToken.tokenAddress === token.contractHash
    );
    if (!tokenInfo) {
      return token;
    }

    return {
      ...token,
      balance: tokenInfo.balance,
    };
  });

  return fetchedTokens;
};
