import { BaseStorage } from './base';
import { TransactionHistory } from '@/typings/transactionHistory';

export class BaseTransactionStorage extends BaseStorage {
  public async pushTransactionHistory(transactionHistory: TransactionHistory) {
    const transactionHistories = await this.getItem<TransactionHistory[]>();

    const newTransactionHistories = [
      ...(transactionHistories || []),
      transactionHistory,
    ];

    await this.setItem(newTransactionHistories);
  }

  public async getTransactionHistories() {
    const transactionHistories = await this.getItem<TransactionHistory[]>();

    return transactionHistories || [];
  }
}
