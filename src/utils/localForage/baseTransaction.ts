import { BaseStorage } from './base';
import { NFTTransactionHistory } from '@/typings/nftTransactionHistory';

export class BaseTransactionStorage extends BaseStorage {
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
}
