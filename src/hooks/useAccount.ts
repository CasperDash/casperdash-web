import { useSelector } from 'react-redux';

import { publicKeySelector } from '@/store/wallet';

export const useAccount = () => {
  const publicKey = useSelector(publicKeySelector);

  return {
    publicKey,
    isConnected: !!publicKey,
  };
};
