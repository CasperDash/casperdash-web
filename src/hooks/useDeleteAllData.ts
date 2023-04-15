import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDisconnectToDapp } from './postMesasges/useDisconnectToDapp';
import { useI18nToast } from './useI18nToast';
import { PathEnum } from '@/enums';
import { useAppDispatch } from '@/store';
import { reset } from '@/store/wallet';
import { localStorageUtil } from '@/utils/localStorage';

export const useDeleteAllData = () => {
  const navigate = useNavigate();
  const disconnect = useDisconnectToDapp();
  const dispatch = useAppDispatch();
  const { toastSuccess } = useI18nToast();

  const handleDeleteAllData = useCallback(() => {
    dispatch(reset());
    disconnect();
    localStorageUtil.removeAll();

    toastSuccess('delete_all_data');
    navigate(PathEnum.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return handleDeleteAllData;
};
