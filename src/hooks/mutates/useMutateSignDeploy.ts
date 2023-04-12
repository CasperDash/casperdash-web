import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import Big from 'big.js';
import { motesToCSPR } from 'casper-js-sdk';
import dayjs from 'dayjs';
import * as _ from 'lodash-es';
import { useSelector } from 'react-redux';
import { JsonTypes } from 'typedjson';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { deploy } from '@/services/casperdash/deploy/deploy.service';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { publicKeySelector } from '@/store/wallet';
import casperUserUtil from '@/utils/casper/casperUser';
import { parseDeployData } from '@/utils/casper/parser';
type DeployParams = {
  deploy: {
    deploy: JsonTypes;
  };
  signingPublicKeyHex: string;
  targetPublicKeyHex: string;
};

export const useMutateSignDeploy = (
  options?: UseMutationOptions<DeployResponse, unknown, DeployParams, unknown>
) => {
  const publicKey = useSelector(publicKeySelector);
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async ({
      deploy: deployJson,
      signingPublicKeyHex,
      targetPublicKeyHex,
    }: DeployParams) => {
      const signedDeploy = await casperUserUtil.signPrivateKeyProcess({
        deployJSON: deployJson,
      });

      const signedDeployJson = await deploy(signedDeploy);
      const parsedDeployData = await parseDeployData({
        deploy: deployJson,
        signingPublicKeyHex: signingPublicKeyHex,
        targetPublicKeyHex: targetPublicKeyHex,
      });

      queryClient.setQueryData(
        [QueryKeysEnum.TRANSACTION_HISTORIES, publicKey],
        (oldTransactionHistories?: TransactionHistory[]) => {
          const newTransactionHistory = {
            fromPublicKeyHex: signingPublicKeyHex,
            toPublicKeyHex: targetPublicKeyHex,
            amount: motesToCSPR(
              Big(_.get(parsedDeployData, `deployArgs["Amount"]`, 0)).toNumber()
            ).toNumber(),
            transferId: Big(
              _.get(parsedDeployData, `deployArgs['Transfer Id']`, 0)
            ).toNumber(),
            fee: motesToCSPR(
              Big(parsedDeployData.payment).toNumber()
            ).toNumber(),
            deployHash: _.get(parsedDeployData, 'deployHash', ''),
            status: TransactionStatusEnum.PENDING,
            date: dayjs().toISOString(),
          };
          if (!oldTransactionHistories) {
            return [newTransactionHistory];
          }

          return [newTransactionHistory, ...oldTransactionHistories];
        }
      );
      return signedDeployJson;
    },
  });
};
