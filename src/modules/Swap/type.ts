import { PairData, PairRouteData } from '@/services/friendlyMarket/amm/type';
import { Token } from '@/services/friendlyMarket/tokens';

export type SwapName = 'swapFrom' | 'swapTo';

export type FieldValues = {
  swapFrom: Token;
  swapTo: Token;
  swapSettings: {
    slippage: number;
    deadline: number;
  };
  pair: PairData | PairRouteData;
};
