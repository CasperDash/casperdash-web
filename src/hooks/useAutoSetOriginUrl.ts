import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { isConnectedSelector, setOriginUrl } from '@/store/sdk';

export const useAutoSetOriginUrl = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(isConnectedSelector);
  const [searchParams] = useSearchParams();
  const originUrl = searchParams.get('originUrl');

  useEffect(() => {
    if (isConnected) {
      return;
    }

    if (originUrl) {
      dispatch(setOriginUrl(originUrl));
    }
  }, [isConnected, dispatch, originUrl]);
};
