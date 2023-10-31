import { useMemo } from 'react';

import _get from 'lodash-es/get';

import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { useGetTransactions } from '@/hooks/queries/useGetTransactions';
import { useAccount } from '@/hooks/useAccount';
import { NFTTransactionHistory } from '@/typings/nftTransactionHistory';

type Params = {
  tokenId?: string;
  tokenAddress?: string;
  action: DeployActionsEnum.CANCEL_LIST_ITEM | DeployActionsEnum.LIST_ITEM;
};

export const useGetPendingActionTransaction = ({
  tokenId,
  tokenAddress,
  action,
}: Params) => {
  const { publicKey } = useAccount();
  const { data, isLoading } = useGetTransactions(publicKey);

  const foundTransaction = useMemo(() => {
    if (!data || !tokenAddress || !tokenId) {
      return;
    }

    const foundItem = data.find(
      (transaction: NFTTransactionHistory) =>
        transaction.action === action &&
        transaction.context === DeployContextEnum.NFT &&
        transaction.status === TransactionStatusEnum.PENDING &&
        _get(transaction, 'args.tokenId') === tokenId &&
        _get(transaction, 'additionalInfos.contractPackageHash') ===
          tokenAddress
    );

    return foundItem;
  }, [action, data, tokenAddress, tokenId]);

  return {
    transaction: foundTransaction,
    isPending: !!foundTransaction,
    isLoading,
  };
};
