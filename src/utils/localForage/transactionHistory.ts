import { BaseStorage } from './base';
import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { StorageKeysEnum } from '@/enums/storageKeys';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { NFTTransactionHistory } from '@/typings/nftTransactionHistory';

export class TransactionHistoryStorage extends BaseStorage {
  constructor(publicKey: string) {
    super(StorageKeysEnum.TRANSACTION_HISTORIES, publicKey);
  }

  public async pushTransactionHistory(
    transactionHistory: NFTTransactionHistory
  ) {
    const transactionHistories = await this.getItem<NFTTransactionHistory[]>();

    const newTransactionHistories = [
      ...(transactionHistories || []),
      transactionHistory,
    ];

    await this.setItem(newTransactionHistories);
  }

  public async getTransactionHistories() {
    const transactionHistories = await this.getItem<NFTTransactionHistory[]>();

    return transactionHistories || [];
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
    const foundItem = await this.findItem<NFTTransactionHistory>(
      (item: NFTTransactionHistory) =>
        item.context === context &&
        item.args.tokenId === tokenId &&
        item.args.tokenAddress === tokenAddress &&
        item.status === TransactionStatusEnum.PENDING &&
        item.action === action
    );

    return foundItem;
  }
}
