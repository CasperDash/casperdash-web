import { BigNumber } from '@ethersproject/bignumber';
import * as _ from 'lodash-es';

import { toCSPR } from './currency';
import { Account } from '@/services/casperdash/user';
import { SignDeployParams, SignMessageParams } from '@/typings/signingParams';
import { WalletAccount } from '@/typings/walletAccount';

export const normalizeAccount = (account: Account): Partial<WalletAccount> => {
  const balance = _.get(account, 'balance');
  return {
    publicKey: _.get(account, 'publicKey'),
    accountHash: _.get(account, '_accountHash'),
    balance: balance.hex ? toCSPR(BigNumber.from(balance.hex).toNumber()) : 0,
  };
};

export const normalizeSignDeployParams = (
  params: Record<string, string | undefined>
): SignDeployParams => {
  return {
    targetPublicKeyHex: _.get(params, 'targetPublicKeyHex', ''),
    signingPublicKeyHex: _.get(params, 'signingPublicKeyHex', ''),
    deploy: JSON.parse(_.get(params, 'deploy', '{}')),
  };
};

export const normalizeSignMessageParams = (
  params: Record<string, string | undefined>
): SignMessageParams => {
  return {
    signingPublicKeyHex: _.get(params, 'signingPublicKeyHex', ''),
    message: _.get(params, 'message', ''),
  };
};
