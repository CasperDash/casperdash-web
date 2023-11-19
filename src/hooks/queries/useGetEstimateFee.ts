import { useQuery } from '@tanstack/react-query';
import { JsonTypes } from 'typedjson';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { speculativeDeploy } from '@/services/casperdash/network/network.service';

export type Params = Record<string, unknown>;

type Variable = () => Promise<JsonTypes>;

export const useGetEstimateFee = (params: Params, buildFn: Variable) => {
  const queryFn = async () => {
    const data = await buildFn();
    if (!data) {
      return null;
    }

    return speculativeDeploy(data);
  };

  return useQuery([QueryKeysEnum.ESTIMATE_FEE, params], {
    queryFn,
    enabled: !!params && !!buildFn,
  });
};
