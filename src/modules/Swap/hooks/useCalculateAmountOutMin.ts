import { useGetSwapSettings } from './useGetSwapSettings';
import { useSelectToken } from './useSelectToken';
import { calculateAmountOutMin } from '../utils';

export const useCalculateAmountOutMin = () => {
  const swapTo = useSelectToken('swapTo');
  const { data: swapSettings = { slippage: 0 }, isLoading } =
    useGetSwapSettings();

  if (isLoading) {
    return 0;
  }

  const amountOutMin = calculateAmountOutMin(
    swapTo.amount,
    swapSettings.slippage,
    swapTo.decimals
  );

  return amountOutMin;
};
