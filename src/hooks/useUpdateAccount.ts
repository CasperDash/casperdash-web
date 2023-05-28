import { useCallback } from 'react';

import { useAppDispatch } from '@/store';
import { changeAccount, IWallet } from '@/store/wallet';

export const useUpdateAccount = () => {
  const dispatch = useAppDispatch();
  const updateAccount = useCallback(
    ({ publicKey, uid }: Pick<IWallet, 'publicKey' | 'uid'>) => {
      dispatch(
        changeAccount({
          publicKey,
          uid,
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    updateAccount,
  };
};
