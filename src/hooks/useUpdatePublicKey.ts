import { useCallback } from 'react';

import { useAppDispatch } from '@/store';
import {
  updatePublicKey as updatePublicKeyOnStore,
  updatePublicKeyAfterCreateWallet as updatePublicKeyAfterCreateWalletOnStore,
} from '@/store/wallet';

export const useUpdatePublicKey = () => {
  const dispatch = useAppDispatch();
  const updatePublicKey = useCallback((publicKey: string) => {
    dispatch(updatePublicKeyOnStore(publicKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePublicKeyAfterCreateWallet = useCallback((publicKey: string) => {
    dispatch(updatePublicKeyAfterCreateWalletOnStore(publicKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    updatePublicKey,
    updatePublicKeyAfterCreateWallet,
  };
};
