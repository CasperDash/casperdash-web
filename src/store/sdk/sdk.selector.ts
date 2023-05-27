import { createSelector } from '@reduxjs/toolkit';

import { NAME_SPACE } from './sdk.slice';
import { AppState } from '..';

// Select connected url
const selectOriginUrl = (state: AppState) => {
  return {
    originUrl: state[NAME_SPACE].originUrl,
  };
};
export const originUrlSelector = createSelector(
  selectOriginUrl,
  ({ originUrl }) => originUrl
);

// Select connected url
const selectIsConnected = (state: AppState) => {
  return {
    isConnected: state[NAME_SPACE].isConnected,
  };
};
export const isConnectedSelector = createSelector(
  selectIsConnected,
  ({ isConnected }) => isConnected
);
