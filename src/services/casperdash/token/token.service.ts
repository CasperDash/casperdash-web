import {
  GetTokenParams,
  GetTokenResponse,
  GetTokensInfoParams,
  GetTokensInfoResponse,
} from './type';
import request from '../request';

export const getToken = async ({
  tokenAddress,
}: GetTokenParams): Promise<GetTokenResponse> => {
  return request.get(`/token/${tokenAddress}`);
};

export const getTokensInfo = async ({
  tokenAddress,
  publicKey,
}: GetTokensInfoParams): Promise<GetTokensInfoResponse> => {
  return request.get(`/tokens/getTokensInfo`, {
    params: {
      tokenAddress,
      publicKey,
    },
  });
};
