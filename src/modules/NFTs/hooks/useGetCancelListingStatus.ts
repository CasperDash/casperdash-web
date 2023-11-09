import _get from 'lodash-es/get';

import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { useGetLastNFTTransactionStatus } from '@/hooks/queries/useGetStatusNFTTransactions';
import { TransactionHistory } from '@/typings/transactionHistory';

type Params = {
  contractAddress: string;
  tokenId: string;
};

export const useGetCancelListingStatus = (params: Params) => {
  return useGetLastNFTTransactionStatus({
    filterFn: (transaction: TransactionHistory) =>
      transaction.action === DeployActionsEnum.CANCEL_LIST_ITEM &&
      transaction.context === DeployContextEnum.NFT &&
      transaction.status === TransactionStatusEnum.PENDING &&
      _get(transaction, 'args.tokenId') === params.tokenId &&
      _get(transaction, 'additionalInfos.contractPackageHash') ===
        params.contractAddress,

    queryKey: [
      DeployActionsEnum.CANCEL_LIST_ITEM,
      params.contractAddress,
      params.tokenId,
    ],
    context: DeployContextEnum.NFT,
  });
};
