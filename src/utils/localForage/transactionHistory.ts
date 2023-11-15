import { BaseTransactionStorage } from './baseTransaction';
import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { StorageKeysEnum } from '@/enums/storageKeys';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { TransactionHistory } from '@/typings/transactionHistory';

export class TransactionHistoryStorage extends BaseTransactionStorage {
  constructor(publicKey: string) {
    super(StorageKeysEnum.TRANSACTION_HISTORIES, publicKey);
  }

  public async findPendingTokenTransactionHistory({
    context,
    tokenId,
    tokenAddress,
    action,
  }: {
    context: DeployContextEnum;
    tokenId: string;
    tokenAddress: string;
    action: DeployActionsEnum;
  }) {
    const foundItem = await this.findItem<TransactionHistory>(
      (item: TransactionHistory) =>
        item.context === context &&
        item.args.tokenId === tokenId &&
        item.args.tokenAddress === tokenAddress &&
        item.status === TransactionStatusEnum.PENDING &&
        item.action === action
    );

    return foundItem;
  }
}
