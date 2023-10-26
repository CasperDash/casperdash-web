import {
  GetMarketNFTsParams,
  IMarketContract,
  IMarketNFT,
  IMarketNFTsResponse,
} from './type';
import request from '@/services/casperdash/request';

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

  return data;
};

export const getMarketContractInfo = async (
  tokenAddress: string
): Promise<IMarketContract> => {
  const data: IMarketContract = await request.get(
    `/v1/market/nfts/${tokenAddress}`
  );

  return data;
};
