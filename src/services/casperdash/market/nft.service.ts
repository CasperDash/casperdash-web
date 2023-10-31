import {
  GetMarketNFTsParams,
  IMarketContractAndItem,
  IMarketNFT,
  IMarketNFTsResponse,
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

  return {
    ...data,
    tokenContract: normalizeTokenContract(data.tokenContract),
  };
};

export const getMarketContractAndItemInfo = async (
  tokenAddress: string,
  tokenId: string
): Promise<IMarketContractAndItem> => {
  const data: IMarketContractAndItem = await request.get(
    `/v1/market/nfts/${tokenAddress}/${tokenId}/info`
  );
  if (!data) {
    return data;
  }

  return {
    ...data,
    contract: normalizeTokenContract(data.contract),
  };
};
