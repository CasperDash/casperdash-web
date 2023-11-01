import localforage from 'localforage';

const STORAGE_NAME = 'casperDashWeb';

export const store = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: STORAGE_NAME,
});

export const getItem = async <T>(key: string): Promise<T | null> => {
  return store.getItem<T>(key);
};

export const setItem = async <T>(key: string, value: T): Promise<T> => {
  return store.setItem(key, value);
};

export const removeItem = async (key: string): Promise<void> => {
  return store.removeItem(key);
};

export const clear = async (): Promise<void> => {
  return store.clear();
};

export const length = async (): Promise<number> => {
  return store.length();
};

export const key = async (keyIndex: number): Promise<string> => {
  return store.key(keyIndex);
};

export const keys = async (): Promise<string[]> => {
  return store.keys();
};

export const iterate = async <T, U>(
  iteratee: (value: T, key: string, iterationNumber: number) => U
): Promise<U> => {
  return store.iterate(iteratee);
};
