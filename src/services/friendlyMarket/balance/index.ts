import {
  GetBalanceParams,
  GetBalanceResponse,
  getErc20BalanceParams,
} from './type';
import request from '../request';

const DEFAULT_NETWORK = 'casper';

export const getBalance = async ({
  publicKey,
  network = DEFAULT_NETWORK,
}: GetBalanceParams): Promise<GetBalanceResponse> => {
  return request.get(`/misc/balance/${publicKey}?network=${network}`);
};

export const getErc20Balance = async ({
  publicKey,
  contractHash,
  network = DEFAULT_NETWORK,
}: getErc20BalanceParams): Promise<GetBalanceResponse> => {
  return request.get(
    `/erc20/balance/hash-${contractHash}/${publicKey}?network=${network}`
  );
};

export * from './type';
