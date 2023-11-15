import { BigNumber } from '@ethersproject/bignumber';
import Big from 'big.js';
import * as _ from 'lodash-es';

import { toCSPR } from './currency';
import { ITokenContract } from '@/services/casperdash/market/type';
import { Account } from '@/services/casperdash/user';
import { SignDeployParams, SignMessageParams } from '@/typings/signingParams';
import { WalletAccountBalance } from '@/typings/walletAccount';

export const normalizeBalance = (account: Account): number => {
  const balance = _.get(account, 'balance');
  return balance.hex ? toCSPR(BigNumber.from(balance.hex).toNumber()) : 0;
};

export const normalizeAccountBalance = (
  account: Account
): WalletAccountBalance => {
  return {
    publicKey: _.get(account, 'publicKey', ''),
    balance: normalizeBalance(account),
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

export const normalizeTokenContract = (
  tokenContract: ITokenContract
): ITokenContract => {
  if (!tokenContract) {
    return tokenContract;
  }

  return {
    ...tokenContract,
    royaltyFee: Big(tokenContract?.royaltyFee || 0)
      .div(10)
      .toNumber(),
  };
};
