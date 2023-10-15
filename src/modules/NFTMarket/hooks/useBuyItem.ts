import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { csprToMotes } from 'casper-js-sdk';

import { Config } from '@/config';
import { useAccount } from '@/hooks/useAccount';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import casperUserUtil from '@/utils/casper/casperUser';
import { BuyItemArgs, MarketContract } from '@/utils/marketContract/contract';

type Params = Pick<BuyItemArgs, 'token' | 'tokenId' | 'amount'>;
const FEE_NETWORK_IN_CSPR = 26;

export const useBuyItem = (
  options?: UseMutationOptions<DeployResponse, unknown, Params, unknown>
) => {
  const { publicKey } = useAccount();
  const mutation = useMutation({
    ...options,
    mutationFn: async (params: Params) => {
      if (!publicKey) {
        throw new Error('Please connect to buy item');
      }
      const contract = new MarketContract(
        Config.contracts.vkMarketplace.contractHash,
        Config.contracts.vkMarketplace.contractPackageHash,
        {
          chainName: Config.networkName,
        }
      );

      const buildedDeploy = await contract.buyItem({
        ...params,
        paymentAmount: csprToMotes(FEE_NETWORK_IN_CSPR).toNumber(),
        fromPublicKeyHex: publicKey!,
      });
      const signedDeploy = await casperUserUtil.signWithPrivateKey(
        buildedDeploy
      );

      const result = await deploy(signedDeploy);

      return result;
    },
  });

  return {
    ...mutation,
    feeNetwork: FEE_NETWORK_IN_CSPR,
  };
};
