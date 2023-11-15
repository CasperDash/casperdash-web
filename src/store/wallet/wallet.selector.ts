import { createSelector } from '@reduxjs/toolkit';
import { EncryptionType } from 'casper-storage';

import { NAME_SPACE } from './wallet.slice';
import { AppState } from '..';
import { StatusEnum } from '@/enums/status';

// Master key
const selectMasterKeyEntropy = (state: AppState) =>
  state[NAME_SPACE].masterKeyEntropy;
export const masterKeyEntropySelector = createSelector(
  selectMasterKeyEntropy,
  (masterKey?: Uint8Array) => masterKey
);

// Encryption type
const selectEncryptionType = (state: AppState) =>
  state[NAME_SPACE].encryptionType;
export const encryptionTypeSelector = createSelector(
  selectEncryptionType,
  (encryptionType?: EncryptionType) => encryptionType
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

// UID
const selectUID = (state: AppState) => state[NAME_SPACE].uid;
export const uidSelector = createSelector(selectUID, (uid?: string) => uid);
