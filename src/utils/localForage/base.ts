import _isArray from 'lodash-es/isArray';

import { getItem, setItem } from '.';
export class BaseStorage {
  protected storageKey = '';

  constructor(name: string, publicKey?: string) {
    this.storageKey = publicKey ? `${name}_${publicKey}` : name;
  }

  public async getItem<T>(): Promise<T | null> {
    const data = await getItem<T>(this.storageKey);

    return data;
  }

  public async setItem<T>(data: T) {
    await setItem(this.storageKey, data);
  }

  public async removeItem() {
    await setItem(this.storageKey, null);
  }

  public async clear() {
    await setItem(this.storageKey, null);
  }

  public async findItem<T>(predicate: (item: T) => boolean): Promise<T | null> {
    const data = await this.getItem<T>();
    if (!data || !_isArray(data)) {
      return null;
    }

    const item = data.find(predicate);

    return item || null;
  }
}
