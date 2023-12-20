import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  CheckAirdropCodeParams,
  CheckAirdropCodeResponse,
} from '@/services/airdrop/user/type';
import { checkAirdropCode } from '@/services/airdrop/user/user.service';
import { AirdropCodeStorage } from '@/utils/localForage/airdropCode';

export const useMutateCheckAirdropCode = (
  options?: UseMutationOptions<
    CheckAirdropCodeResponse,
    AxiosError,
    CheckAirdropCodeParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: checkAirdropCode,
    networkMode: 'offlineFirst',
    onSuccess: async (data, variables, context) => {
      const airdropCodeStorage = new AirdropCodeStorage();
      await airdropCodeStorage.setCode(variables.airdropCode);

      options?.onSuccess?.(data, variables, context);
    },
  });
};
