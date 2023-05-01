import { useSelector } from 'react-redux';

import { useGetLocked } from './queries/useGetLocked';
import { publicKeySelector, uidSelector } from '@/store/wallet';

export const useAccount = () => {
  const publicKey = useSelector(publicKeySelector);
  const uid = useSelector(uidSelector);
  const { data: isLocked } = useGetLocked();

  return {
    publicKey,
    isConnected: !!publicKey,
    uid,
    isLocked,
  };
};
