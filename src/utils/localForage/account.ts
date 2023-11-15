import { BaseStorage } from './base';
import { StorageKeysEnum } from '@/enums/storageKeys';

export class AccountStorage extends BaseStorage {
  constructor(publicKey: string) {
    super(StorageKeysEnum.ACCOUNTS, publicKey);
  }
}
