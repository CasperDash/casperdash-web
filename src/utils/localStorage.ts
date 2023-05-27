import { LoginOptions } from './casper/user';

export enum CacheKeyEnum {
  PUBLIC_KEY = 'publicKey',
  LOGIN_OPTIONS = 'loginOptions',
}

interface CacheValues {
  [CacheKeyEnum.PUBLIC_KEY]: string | undefined;
  [CacheKeyEnum.LOGIN_OPTIONS]: LoginOptions | undefined;
}

interface CacheUtil {
  set: <T extends CacheKeyEnum>(key: T, object: CacheValues[T]) => void;
  get: <T extends CacheKeyEnum>(key: T) => CacheValues[T];
  remove: (key: CacheKeyEnum) => void;
  removeAll: () => void;
}

export const localStorageUtil: CacheUtil = {
  set: (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
  },
  get: (key) => {
    const keyStr = localStorage.getItem(key);
    if (!keyStr) {
      return undefined;
    }

    return JSON.parse(keyStr);
  },
  remove: (key) => localStorage.removeItem(key),
  removeAll: () => localStorage.clear(),
};
