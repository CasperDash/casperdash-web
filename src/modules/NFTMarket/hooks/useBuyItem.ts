import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { csprToMotes } from 'casper-js-sdk';
import dayjs from 'dayjs';

import { Config } from '@/config';
import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { DeployTypesEnum } from '@/enums/deployTypes';
import { MarketTokenTypesEnum } from '@/enums/marketTokeTypes';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { useMutateAddTransaction } from '@/hooks/mutates/useMutateAddTransaction';
import { useGetConfigs } from '@/hooks/queries/useGetConfigs';
import { useAccount } from '@/hooks/useAccount';
import { useEstimateNetworkFee } from '@/hooks/useEstimateNetworkFee';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import casperUserUtil from '@/utils/casper/casperUser';
import { BuyItemArgs, MarketContract } from '@/utils/marketContract/contract';

type Params = Pick<BuyItemArgs, 'token' | 'tokenId' | 'amount'>;

type UseBuyItemParams = {
  tokenType?: MarketTokenTypesEnum;
};

export const useBuyItem = (
  { tokenType }: UseBuyItemParams,
  options?: UseMutationOptions<DeployResponse, unknown, Params, unknown>
) => {
  const { publicKey } = useAccount();
  const { data } = useGetConfigs();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutateAddTransaction(publicKey);
  const { fee } = useEstimateNetworkFee({
    action: DeployActionsEnum.BUY_ITEM,
    tokenType,
  });

  const mutation = useMutation({
    ...options,
    mutationFn: async (params: Params) => {
      if (!publicKey) {
        throw new Error('Please connect to buy item');
      }
      const contract = new MarketContract(
        `hash-${data?.MARKETPLACE_CONTRACT?.contractHash}`,
        `hash-${data?.MARKETPLACE_CONTRACT?.contractPackageHash}`,
        {
          chainName: Config.networkName,
        }
      );

      const paymentAmount = csprToMotes(fee).toNumber();

      const buildedDeploy = await contract.buyItem({
        ...params,
        paymentAmount,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fromPublicKeyHex: publicKey!,
      });
      const signedDeploy = await casperUserUtil.signWithPrivateKey(
        buildedDeploy
      );

      const result = await deploy(signedDeploy);

      if (result.deployHash) {
        await mutateAsync({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fromPublicKeyHex: publicKey!,
          toPublicKeyHex: params.token,
          status: TransactionStatusEnum.PENDING,
          deployHash: result.deployHash,
          context: DeployContextEnum.NFT,
          type: DeployTypesEnum.WASM_BASED_DEPLOY,
          args: {
            token: params.token,
            tokenId: params.tokenId,
            amount: params.amount,
          },
          action: DeployActionsEnum.BUY_ITEM,
          paymentAmount,
          date: dayjs().toISOString(),
        });

        await queryClient.invalidateQueries([
          QueryKeysEnum.TRANSACTIONS,
          publicKey,
        ]);
      }

      return result;
    },
  });

  return {
    ...mutation,
    feeNetwork: fee,
  };
};
