export interface ListResponse<T> {
  docs: T[];
  totalDocs: number;
  hasNextPage: boolean;
  nextPage: number | null;
}

export interface IMarketNFTAttribute {
  key: string;
  value: string;
}

export interface ITokenContract {
  _id: string;
  tokenContractHash: string;
  tokenPackageHash: string;
  tokenType: number;
  owner: string;
  royaltyFee: number;
  deployTimestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMarketNFT {
  name?: string;
  image?: string;
  description?: string;
  tokenId: string;
  tokenPackageHash: string;
  status: string;
  listingAmount: number;
  sellerAccountHash: string;
  metadata: IMarketNFTAttribute[];
  tokenContract: ITokenContract;
}

export interface IMarketContract {
  royaltyFee: number;
}

export type IMarketNFTsResponse = ListResponse<IMarketNFT>;

export type GetMarketNFTsParams = {
  page: number;
  limit: number;
};

export interface IMarketContractAndItem {
  contract: ITokenContract;
  item: IMarketNFT;
}

export interface IGetMarketContractsParams {
  query?: Partial<ITokenContract>;
  sort?: {
    [key: string]: 'asc' | 'desc';
  };
  page?: number;
  limit?: number;
}

export interface IPriceHistory {
  price: number;
  timestamp: string;
}
