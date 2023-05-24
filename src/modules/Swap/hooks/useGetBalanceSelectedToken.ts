import { useFormContext, useWatch } from 'react-hook-form';

import { useGetSwapTokenBalance } from './useGetSwapTokenBalance';
import { useAccount } from '@/hooks/useAccount';

type Name = 'swapFrom' | 'swapTo';

export const useGetBalanceSelectedToken = (name: Name) => {
  const { publicKey } = useAccount();
  const { control } = useFormContext();
  const value = useWatch({
    control,
    name: name,
  });

  return useGetSwapTokenBalance({
    ...value,
    publicKey,
  });
};
