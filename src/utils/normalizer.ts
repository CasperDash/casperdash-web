import { BigNumber } from '@ethersproject/bignumber';
import * as _ from 'lodash-es';

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
