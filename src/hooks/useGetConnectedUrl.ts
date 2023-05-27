import { useSelector } from 'react-redux';

import { originUrlSelector, isConnectedSelector } from '@/store/sdk';

export const useGetConnectedUrl = () => {
  const originUrl = useSelector(originUrlSelector);
  const isConnected = useSelector(isConnectedSelector);
  if (!isConnected) {
    return undefined;
  }

  return originUrl;
};
