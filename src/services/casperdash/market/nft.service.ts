import {
  GetMarketNFTsParams,
  IMarketNFT,
  IMarketNFTsResponse,
  ITokenContract,
} from './type';
import request from '@/services/casperdash/request';
import { normalizeTokenContract } from '@/utils/normalizer';

export const getMarketNFTs = async ({
  page,
  limit,
}: Partial<GetMarketNFTsParams> = {}): Promise<IMarketNFTsResponse> => {
  const data: IMarketNFTsResponse = await request.get(`/v1/market/nfts`, {
    params: {
      page,
      limit,
      sort: {
        createdAt: -1,
      },
    },
  });

  return data;
};

export const getMarketNFT = async (
  tokenAddress: string,
  tokenId: string
): Promise<IMarketNFT> => {
  const data: IMarketNFT = await request.get(
    `/v1/market/nfts/${tokenAddress}/${tokenId}`
  );

  if (!data) {
    return data;
  }

  return {
    ...data,
    tokenContract: normalizeTokenContract(data?.tokenContract),
  };
};

export const getMarketContract = async (
  tokenAddress: string
): Promise<ITokenContract> => {
  const data: ITokenContract = await request.get(
    `/v1/market/contracts/${tokenAddress}`
  );
  if (!data) {
    return data;
  }

  return normalizeTokenContract(data);
};
