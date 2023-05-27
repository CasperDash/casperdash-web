import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISDK {
  isConnected: boolean;
  originUrl: string;
}

export const NAME_SPACE = 'sdk';

const initialState: ISDK = {
  isConnected: false,
  originUrl: '',
};

export const sdkSlice = createSlice({
  name: NAME_SPACE,
  initialState,
  reducers: {
    connectToDapp: (state: ISDK, action: PayloadAction<string>) => {
      const { payload: url } = action;
      state.isConnected = true;

      if (url) {
        state.originUrl = url;
      }
    },
    setOriginUrl: (state: ISDK, action: PayloadAction<string>) => {
      const { payload: url } = action;
      state.originUrl = url;
    },
    reset: () => initialState,
  },
});

export const { connectToDapp, setOriginUrl } = sdkSlice.actions;

export const reducers = {
  [NAME_SPACE]: sdkSlice.reducer,
};
