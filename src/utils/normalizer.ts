import { BigNumber } from '@ethersproject/bignumber';
import * as _ from 'lodash-es';
import { JsonTypes } from 'typedjson';

import { toCSPR } from './currency';
import { Account } from '@/services/casperdash/user';
import { WalletAccount } from '@/typings/walletAccount';

export const normalizeAccount = (account: Account): WalletAccount => {
  const balance = _.get(account, 'balance', 0);
  return {
    publicKey: _.get(account, 'publicKey'),
    accountHash: _.get(account, '_accountHash'),
    balance: toCSPR(BigNumber.from(balance).toNumber()),
  };
};

type Result = {
  deploy: {
    deploy: JsonTypes;
  };
  signingPublicKeyHex: string;
  targetPublicKeyHex: string;
};

export const normalizeSignDeployParams = (
  params: Record<string, string | undefined>
): Result => {
  return {
    targetPublicKeyHex: _.get(params, 'targetPublicKeyHex', ''),
    signingPublicKeyHex: _.get(params, 'signingPublicKeyHex', ''),
    deploy: JSON.parse(_.get(params, 'deploy', '{}')),
  };
};
