import { createSelector } from '@reduxjs/toolkit';
import { EncryptionType } from 'casper-storage';

import { NAME_SPACE } from './wallet.slice';
import { AppState } from '..';
import { StatusEnum } from '@/enums/status';

// Master key
const selectMasterKey = (state: AppState) => state[NAME_SPACE].masterKey;
export const masterKeySelector = createSelector(
  selectMasterKey,
  (masterKey?: string) => masterKey
);

// Encryption type
const selectEncryptionType = (state: AppState) =>
  state[NAME_SPACE].encryptionType;
export const encryptionTypeSelector = createSelector(
  selectEncryptionType,
  (encryptionType?: EncryptionType) => encryptionType
);

// Words array
const selectWords = (state: AppState) => state[NAME_SPACE].masterKey;
export const wordsSelector = createSelector(selectWords, (masterKey?: string) =>
  masterKey ? masterKey.split(' ') : []
);

// Public key
const selectPublicKey = (state: AppState) => state[NAME_SPACE].publicKey;
export const publicKeySelector = createSelector(
  selectPublicKey,
  (publicKey?: string) => publicKey
);

// Is wallet active
const selectIsWalletActive = (state: AppState) =>
  state[NAME_SPACE].status === StatusEnum.ACTIVE;
export const isWalletActiveSelector = createSelector(
  selectIsWalletActive,
  (isActive) => isActive
);
