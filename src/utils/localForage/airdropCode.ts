import { BaseStorage } from './base';
import { StorageKeysEnum } from '@/enums/storageKeys';

export class AirdropCodeStorage extends BaseStorage {
  constructor() {
    super(StorageKeysEnum.AIRDROP_CODE);
  }

  public async setCode(code: string) {
    await this.setItem(code);
  }

  public async getCode(): Promise<string | null> {
    const code = await this.getItem<string | null>();

    return code;
  }
}
