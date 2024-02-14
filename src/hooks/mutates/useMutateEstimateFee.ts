import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Big from 'big.js';
import { JsonTypes } from 'typedjson';

import { useGetConfigs } from '../queries/useGetConfigs';
import { SpeculativedStatusEnum } from '@/enums/speculativedStatus';
import { speculativeDeploy } from '@/services/casperdash/network/network.service';
import { toCSPR, toMotes } from '@/utils/currency';

type Result = {
  status: SpeculativedStatusEnum;
  cost: string;
  costInCSPR: string;
};

export type Options = Omit<
  UseMutationOptions<
    Result | undefined,
    Error | AxiosError,
    () => Promise<JsonTypes>
  >,
  'mutationFn' | 'mutationKey'
>;

export const useMutateEstimateFee = (options?: Options) => {
  const { data: { SPEC_FEE_GAP = 0 } = {} } = useGetConfigs();

  return useMutation({
    ...options,
    mutationFn: async (
      callback: () => Promise<JsonTypes>
    ): Promise<Result | undefined> => {
      const data = await callback();
      let result;

      try {
        result = await speculativeDeploy(data);
      } catch (error) {
        const calculatedCost = '35';

        return {
          status: SpeculativedStatusEnum.UNKNOWN,
          cost: toMotes(calculatedCost).toString(),
          costInCSPR: calculatedCost,
        };
      }

      if (!result?.execution_result) {
        throw new Error('Execution result not found');
      }

      if (result.execution_result.Success) {
        const cost = result.execution_result.Success.cost;
        const calculatedCost = Big(cost || '0')
          .add(toMotes(SPEC_FEE_GAP).toString())
          .toString();

        return {
          status: SpeculativedStatusEnum.SUCCESS,
          cost: calculatedCost,
          costInCSPR: toCSPR(calculatedCost).toString(),
        };
      }

      if (result.execution_result.Failure) {
        const cost = result.execution_result.Failure.cost;
        const calculatedCost = Big(cost || '0')
          .add(toMotes(SPEC_FEE_GAP).toString())
          .toString();

        return {
          status: SpeculativedStatusEnum.FAILURE,
          cost: calculatedCost,
          costInCSPR: toCSPR(calculatedCost).toString(),
        };
      }

      throw new Error('Execution result not found');
    },
  });
};
