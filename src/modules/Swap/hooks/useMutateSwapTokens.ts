import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { DeployUtil } from 'casper-js-sdk';
import dayjs from 'dayjs';

import { Config } from '@/config';
import { useAccount } from '@/hooks/useAccount';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import casperUserUtil from '@/utils/casper/casperUser';
import {
  buildExactSwapCSPRForTokensDeploy,
  buildSwapExactTokensForCSPRDeploy,
  buildSwapExactTokensForTokensDeploy,
  buildSwapTokensForExactTokensDeploy,
  FUNCTIONS,
} from '@/utils/casper/tokenServices';

type SwapTokensParams = {
  functionType: string;
  amountIn: number;
  amountOut: number;
  deadlineInMinutes: number;
  path: string[];
};

export const MAP_PAYMENT_AMOUNT = {
  [FUNCTIONS.SWAP_EXACT_CSPR_FOR_TOKENS]: 10,
  [FUNCTIONS.SWAP_TOKENS_FOR_EXACT_TOKENS]: 5,
  [FUNCTIONS.SWAP_EXACT_TOKENS_FOR_CSPR]: 5,
  [FUNCTIONS.SWAP_EXACT_TOKENS_FOR_TOKENS]: 15,
};

export const useMutateSwapTokens = (
  options: UseMutationOptions<string, unknown, SwapTokensParams, unknown> = {}
) => {
  const { publicKey = '' } = useAccount();

  const putSignedDeploy = async (buildedDeploy: DeployUtil.Deploy) => {
    const signedDeploy = await casperUserUtil.signWithPrivateKey(buildedDeploy);

    const result = await deploy(signedDeploy);

    return result.deployHash;
  };

  return useMutation({
    mutationFn: async ({
      functionType,
      amountIn,
      amountOut,
      deadlineInMinutes,
      path,
    }: SwapTokensParams) => {
      let builtDeploy = null;

      switch (functionType) {
        case FUNCTIONS.SWAP_EXACT_CSPR_FOR_TOKENS:
          builtDeploy = await buildExactSwapCSPRForTokensDeploy(
            Config.swapContractHash,
            {
              toPublicKey: publicKey,
              fromPublicKey: publicKey,
              amountIn,
              amountOutMin: amountOut,
              deadline: dayjs().add(deadlineInMinutes, 'minutes').valueOf(),
              path,
              paymentAmount: MAP_PAYMENT_AMOUNT[functionType],
            }
          );

          break;
        case FUNCTIONS.SWAP_TOKENS_FOR_EXACT_TOKENS:
          builtDeploy = await buildSwapTokensForExactTokensDeploy(
            Config.swapContractHash,
            {
              toPublicKey: publicKey,
              fromPublicKey: publicKey,
              amountInMax: amountIn,
              amountOut: amountOut,
              deadline: dayjs().add(deadlineInMinutes, 'minutes').valueOf(),
              path,
              paymentAmount: MAP_PAYMENT_AMOUNT[functionType],
            }
          );

          break;

        case FUNCTIONS.SWAP_EXACT_TOKENS_FOR_CSPR:
          builtDeploy = await buildSwapExactTokensForCSPRDeploy(
            Config.swapContractHash,
            {
              toPublicKey: publicKey,
              fromPublicKey: publicKey,
              amountIn,
              amountOutMin: amountOut,
              deadline: dayjs().add(deadlineInMinutes, 'minutes').valueOf(),
              path,
              paymentAmount: MAP_PAYMENT_AMOUNT[functionType],
            }
          );

          break;
        case FUNCTIONS.SWAP_EXACT_TOKENS_FOR_TOKENS:
          builtDeploy = await buildSwapExactTokensForTokensDeploy(
            Config.swapContractHash,
            {
              toPublicKey: publicKey,
              fromPublicKey: publicKey,
              amountIn,
              amountOutMin: amountOut,
              deadline: dayjs().add(deadlineInMinutes, 'minutes').valueOf(),
              path,
              paymentAmount: MAP_PAYMENT_AMOUNT[functionType],
            }
          );

          break;
        default:
          throw new Error('Invalid function type');
      }

      if (!builtDeploy) {
        throw new Error('Cannot build deploy');
      }

      return putSignedDeploy(builtDeploy);
    },
    ...options,
    onSuccess: (deployHash, variables, context) => {
      options.onSuccess && options.onSuccess(deployHash, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError && options.onError(error, variables, context);
    },
  });
};
