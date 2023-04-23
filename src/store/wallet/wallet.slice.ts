import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EncryptionType } from 'casper-storage';

import { StatusEnum } from '@/enums/status';

export interface IWallet {
  status: StatusEnum;
  uid?: string;
  masterKey?: string;
  publicKey?: string;
  encryptionType?: EncryptionType;
}

export const NAME_SPACE = 'wallet';

const initialState: IWallet = {
  publicKey: undefined,
  uid: undefined,
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
    updateIsActive(state: IWallet, action: PayloadAction<boolean>) {
      const { payload: isActive } = action;
      state.status = isActive ? StatusEnum.ACTIVE : StatusEnum.INACTIVE;
    },
    changeAccount(
      state: IWallet,
      action: PayloadAction<Pick<IWallet, 'publicKey' | 'uid'>>
    ) {
      const {
        payload: { publicKey, uid },
      } = action;
      state.publicKey = publicKey;
      state.uid = uid;
      state.status = StatusEnum.ACTIVE;
      state.masterKey = undefined;
    },
    reset: () => initialState,
  },
});

export const {
  updateEncryptionType,
  updateMasterKey,
  updateEncryptionTypeAndMasterKey,
  updatePublicKey,
  loginWallet,
  updateIsActive,
  reset,
  changeAccount,
} = walletSlice.actions;

export const reducers = {
  [NAME_SPACE]: walletSlice.reducer,
};
