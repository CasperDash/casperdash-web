import { useMemo } from 'react';

import { DeployContextEnum } from '@/enums/deployContext';
import { useGetTransactions } from '@/hooks/queries/useGetTransactions';
import { useAccount } from '@/hooks/useAccount';

export const useGetStakingTransactions = () => {
  const { publicKey } = useAccount();
  const { data, isLoading } = useGetTransactions(publicKey);

  const filteredTransactions = useMemo(() => {
    return data?.filter((transaction) => {
      return transaction.context === DeployContextEnum.STAKING;
    });
  }, [data]);

  return {
    transactions: filteredTransactions,
    isLoading,
  };
};
