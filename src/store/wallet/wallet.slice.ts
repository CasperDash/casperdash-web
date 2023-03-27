import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EncryptionType } from 'casper-storage';

import { StatusEnum } from '@/enums/status';

export interface IWallet {
  status: StatusEnum;
  masterKey?: string;
  publicKey?: string;
  encryptionType: EncryptionType;
}

export const NAME_SPACE = 'wallet';

const initialState: IWallet = {
  publicKey: undefined,
  status: StatusEnum.INACTIVE,
  masterKey: undefined,
  encryptionType: EncryptionType.Ed25519,
};

export const walletSlice = createSlice({
  name: NAME_SPACE,
  initialState,
  reducers: {
    updateEncryptionType: (
      state: IWallet,
      action: PayloadAction<EncryptionType>
    ) => {
      const { payload: encryptionType } = action;
      state.encryptionType = encryptionType;
    },
    updateMasterKey: (state: IWallet, action: PayloadAction<string>) => {
      const { payload: masterKey } = action;
      state.masterKey = masterKey;
    },
    updatePublicKey: (state: IWallet, action: PayloadAction<string>) => {
      const { payload: publicKey } = action;
      state.publicKey = publicKey;
    },
    updateEncryptionTypeAndMasterKey: (
      state: IWallet,
      action: PayloadAction<
        Required<Pick<IWallet, 'masterKey' | 'encryptionType'>>
      >
    ) => {
      const {
        payload: { masterKey, encryptionType },
      } = action;
      state.masterKey = masterKey;
      state.encryptionType = encryptionType;
    },
    updatePublicKeyAfterCreateWallet: (
      state: IWallet,
      action: PayloadAction<string>
    ) => {
      const { payload: publicKey } = action;
      state.publicKey = publicKey;
      state.masterKey = undefined;
      state.status = StatusEnum.ACTIVE;
    },
    loginWallet: (
      state: IWallet,
      action: PayloadAction<Required<Pick<IWallet, 'publicKey'>>>
    ) => {
      const {
        payload: { publicKey },
      } = action;

      state.publicKey = publicKey;
      state.status = StatusEnum.ACTIVE;
    },
    reset: () => initialState,
  },
});

export const {
  updateEncryptionType,
  updateMasterKey,
  updateEncryptionTypeAndMasterKey,
  updatePublicKeyAfterCreateWallet,
  updatePublicKey,
  reset,
} = walletSlice.actions;

export const reducers = {
  [NAME_SPACE]: walletSlice.reducer,
};
