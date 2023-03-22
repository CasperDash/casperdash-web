import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EncryptionType } from 'casper-storage';

export interface IWallet {
  ready: boolean;
  masterKey?: string;
  publicKey?: string;
  encryptionType: EncryptionType;
}

export const NAME_SPACE = 'wallet';

const initialState: IWallet = {
  publicKey: undefined,
  ready: false,
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
    },
    reset: () => initialState,
  },
});

export const {
  updateEncryptionType,
  updateMasterKey,
  updateEncryptionTypeAndMasterKey,
  updatePublicKeyAfterCreateWallet,
  reset,
} = walletSlice.actions;

export const reducers = {
  [NAME_SPACE]: walletSlice.reducer,
};
