import { EncoderUtils, KeyFactory } from 'casper-storage';

const WORDS_LENGTH_MAP = new Map([
  [128, 12],
  [160, 15],
  [192, 18],
  [224, 21],
  [256, 24],
]);

export const getWord = (
  entropy: Uint8Array,
  index: number,
  isDecode?: boolean
) => {
  const keyManager = KeyFactory.getInstance();
  const value = keyManager.getWordAt(entropy, index, true);

  if (isDecode) {
    return EncoderUtils.decodeBase64(value);
  }

  return value;
};

export const getPhraseLength = (entropy?: Uint8Array) => {
  if (!entropy) {
    return 0;
  }

  return entropy ? WORDS_LENGTH_MAP.get(entropy.length * 8) || 0 : 12;
};

export const toEntropy = (words: string[]) => {
  const keyManager = KeyFactory.getInstance();
  return keyManager.toEntropy(words);
};
