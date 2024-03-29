import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import Big from 'big.js';
import dayjs from 'dayjs';

import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { DeployTypesEnum } from '@/enums/deployTypes';
import { MarketTokenTypesEnum } from '@/enums/marketTokeTypes';
import { MutationKeysEnum } from '@/enums/mutationKeys.enum';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { useMutateAddTransaction } from '@/hooks/mutates/useMutateAddTransaction';
import { useGetConfigs } from '@/hooks/queries/useGetConfigs';
import { useGetContractPackageInfo } from '@/hooks/queries/useGetContractPackageInfo';
import { useAccount } from '@/hooks/useAccount';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import casperUserUtil from '@/utils/casper/casperUser';
import { toMotes } from '@/utils/currency';
import { getMarketContract } from '@/utils/marketContract/contract';

type Params = {
  tokenId: string;
  amount: number;
  tokenType?: MarketTokenTypesEnum;
  paymentAmount?: string;
};

const FEE_NETWORK = 20;

export const useCreateNFTListing = (
  contractPackageHash?: string,
  options?: UseMutationOptions<DeployResponse, unknown, Params, unknown>
) => {
  const { publicKey } = useAccount();
  const { data: contractPackageInfo } =
    useGetContractPackageInfo(contractPackageHash);
  const { mutateAsync } = useMutateAddTransaction(publicKey);
  const { data: configs } = useGetConfigs();
  const queryClient = useQueryClient();

  const buildFn = async (params: Params, paymentAmount = 50_000_000_000) => {
    if (!configs) {
      throw new Error('Configs not found');
    }
    const contract = getMarketContract(configs);
    if (!contractPackageInfo?.contract_hash) {
      throw new Error('Contract not found');
    }

    const buildedDeploy = await contract.listItem({
      token: contractPackageInfo.contract_hash,
      tokenId: String(params.tokenId),
      amount: toMotes(params.amount),
      paymentAmount,
      fromPublicKeyHex: publicKey!,
      tokenType: params.tokenType,
    });

    const signedDeploy = await casperUserUtil.signWithPrivateKey(buildedDeploy);

    return signedDeploy;
  };

  const mutation = useMutation({
    ...options,
    mutationKey: [MutationKeysEnum.CREATE_NFT_LISTING, contractPackageHash],
    mutationFn: async (params: Params) => {
      if (!configs) {
        throw new Error('Configs not found');
      }
      if (!contractPackageInfo?.contract_hash) {
        throw new Error('Contract not found');
      }
      const paymentAmount = Big(params.paymentAmount || 0).toNumber();

      const signedDeploy = await buildFn(params, paymentAmount);

      const result = await deploy(signedDeploy);

      if (result.deployHash) {
        await mutateAsync({
          fromPublicKeyHex: publicKey!,
          toPublicKeyHex: contractPackageInfo.contract_hash,
          type: DeployTypesEnum.CONTRACT_CALL,
          paymentAmount: paymentAmount,
          args: {
            token: `hash-${contractPackageInfo.contract_hash}`,
            tokenId: String(params.tokenId),
          },
          status: TransactionStatusEnum.PENDING,
          date: dayjs().toISOString(),
          context: DeployContextEnum.NFT,
          deployHash: result.deployHash,
          entryPoint: 'list_item',
          action: DeployActionsEnum.LIST_ITEM,
          additionalInfos: {
            contractPackageHash: contractPackageHash!,
          },
        });
      }

      return result;
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries([
        QueryKeysEnum.TRANSACTIONS,
        publicKey,
      ]);

      options?.onSuccess?.(data, variables, context);
    },
  });

  return {
    ...mutation,
    feeNetwork: FEE_NETWORK,
    buildFn,
    isReady: !!contractPackageInfo && !!configs,
  };
};
