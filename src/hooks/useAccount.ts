import { useSelector } from 'react-redux';

import { publicKeySelector, uidSelector } from '@/store/wallet';

export const useAccount = () => {
  const publicKey = useSelector(publicKeySelector);
  const uid = useSelector(uidSelector);

  return {
    publicKey,
    isConnected: !!publicKey,
    uid,
  };
};
