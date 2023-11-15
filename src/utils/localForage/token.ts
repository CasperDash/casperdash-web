import { BaseStorage } from './base';
import { StorageKeysEnum } from '@/enums/storageKeys';
import { Token } from '@/typings/token';

export class TokenStorage extends BaseStorage {
  constructor(publicKey: string) {
    super(StorageKeysEnum.TOKENS, publicKey);
  }

  public async pushToken(token: Token) {
    const tokens = await this.getTokens();
    if (!tokens) {
      await this.setItem([token]);
      return;
    }

    const foundToken = tokens.findIndex(
      (item) => item.tokenAddress === token.tokenAddress
    );

    if (foundToken !== -1) {
      tokens[foundToken] = token;
    } else {
      tokens?.push(token);
    }

    await this.setItem(tokens);
  }

  public async getTokens() {
    const tokens = await this.getItem<Token[]>();

    return tokens || [];
  }
}
