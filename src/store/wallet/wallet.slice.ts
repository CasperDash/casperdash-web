import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EncryptionType, KeyFactory } from 'casper-storage';

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

const MAP_WORDS_LENGTH: Record<EncryptionType, number> = {
  [EncryptionType.Ed25519]: 12,
  [EncryptionType.Secp256k1]: 12,
};

export const walletSlice = createSlice({
  name: NAME_SPACE,
  initialState,
  reducers: {
    updateEncryptionTypeAndGenerateMasterKey: (
      state: IWallet,
      action: PayloadAction<EncryptionType>
    ) => {
      const { payload: encryptionType } = action;
      state.encryptionType = encryptionType;

      const masterKey = KeyFactory.getInstance().generate(
        MAP_WORDS_LENGTH[encryptionType]
      );

      state.ready = true;
      state.masterKey = masterKey;
    },
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
      _state: IWallet,
      action: PayloadAction<
        Required<Pick<IWallet, 'masterKey' | 'encryptionType'>>
      >
    ) => {
      const {
        payload: { masterKey, encryptionType },
      } = action;
      walletSlice.actions.updateEncryptionType(encryptionType);
      walletSlice.actions.updateMasterKey(masterKey);
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
  updateEncryptionTypeAndGenerateMasterKey,
  updateEncryptionType,
  updateMasterKey,
  updateEncryptionTypeAndMasterKey,
  updatePublicKeyAfterCreateWallet,
  reset,
} = walletSlice.actions;

export const reducers = {
  [NAME_SPACE]: walletSlice.reducer,
};
