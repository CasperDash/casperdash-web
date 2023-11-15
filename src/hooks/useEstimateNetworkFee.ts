import { useMemo } from 'react';

import { DeployActionsEnum } from '@/enums/deployActions';
import { MarketTokenTypesEnum } from '@/enums/marketTokeTypes';
import { getFeeByAction } from '@/utils/marketContract/contract';

type Params = {
  tokenType?: MarketTokenTypesEnum;
  action: DeployActionsEnum;
};
export const useEstimateNetworkFee = (params: Params) => {
  const fee = useMemo(() => {
    return getFeeByAction(params.action, params.tokenType);
  }, [params.action, params.tokenType]);

  return {
    fee,
  };
};
