import {
  GetMarketNFTsParams,
  IGetMarketContractsParams,
  IMarketNFT,
  IMarketNFTsResponse,
  IPriceHistory,
  ITokenContract,
  ListResponse,
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
  tokenPackageHash: string,
  tokenId: string
): Promise<IMarketNFT> => {
  const data: IMarketNFT = await request.get(
    `/v1/market/nfts/${tokenPackageHash}/${tokenId}`
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

export const getMarketContracts = async (
  params?: IGetMarketContractsParams
): Promise<ListResponse<ITokenContract>> => {
  let normalizedParams: Record<string, string> | undefined;
  if (params) {
    normalizedParams = Object.keys(params).reduce((acc, key) => {
      const value = (params as Record<string, unknown>)[key];
      if (value) {
        acc[key] = JSON.stringify(value);
      }
      return acc;
    }, {} as Record<string, string>);
  }

  const data: ListResponse<ITokenContract> = await request.get(
    `/v1/market/contracts`,
    {
      params: normalizedParams,
    }
  );

  return data;
};

export const getMarketContractByPackageHash = async (
  packageHash: string
): Promise<ITokenContract> => {
  const data: ITokenContract = await request.get(
    `/v1/market/contracts/getByPackageHash`,
    {
      params: {
        packageHash,
      },
    }
  );

  return normalizeTokenContract(data);
};

export const getMarketNFTPriceHistory = async (
  tokenPackageHash: string,
  tokenId: string
): Promise<IPriceHistory[]> => {
  const data: IPriceHistory[] = await request.get(
    `/v1/market/nfts/${tokenPackageHash}/${tokenId}/price-history`
  );

  return data;
};

export const getMarketNFTFloorPrice = async (
  tokenPackageHash: string,
  tokenId: string
): Promise<number> => {
  const data: { floorPrice: number } = await request.get(
    `/v1/market/nfts/${tokenPackageHash}/${tokenId}/floor-price`
  );

  return data.floorPrice;
};

export const getMarketNFTVolume = async (
  tokenPackageHash: string,
  tokenId: string
): Promise<number> => {
  const data: { volume: number } = await request.get(
    `/v1/market/nfts/${tokenPackageHash}/${tokenId}/volume`
  );

  return data.volume;
};
