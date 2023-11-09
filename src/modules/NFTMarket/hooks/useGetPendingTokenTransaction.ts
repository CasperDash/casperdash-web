import { useMemo } from 'react';

import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { useGetTransactions } from '@/hooks/queries/useGetTransactions';
import { useAccount } from '@/hooks/useAccount';
import { TransactionHistory } from '@/typings/transactionHistory';

type Params = {
  tokenId?: string;
  tokenAddress?: string;
};

export const useGetPendingTokenTransaction = ({
  tokenId,
  tokenAddress,
}: Params) => {
  const { publicKey } = useAccount();
  const { data, isLoading } = useGetTransactions(publicKey);

  const foundTransaction = useMemo(() => {
    if (!data || !tokenAddress || !tokenId) {
      return;
    }

    const foundItem = data.find(
      (item: TransactionHistory) =>
        item.context === DeployContextEnum.NFT &&
        item.args.tokenId === tokenId &&
        item.args.token === `hash-${tokenAddress}` &&
        item.status === TransactionStatusEnum.PENDING &&
        item.action === DeployActionsEnum.BUY_ITEM
    );

    return foundItem;
  }, [data, tokenAddress, tokenId]);

  return {
    transaction: foundTransaction,
    isPending: !!foundTransaction,
    isLoading,
  };
};
