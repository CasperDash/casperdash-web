export interface ListResponse<T> {
  docs: T[];
  totalDocs: number;
  hasNextPage: boolean;
  nextPage: number | null;
}

export interface IMarketNFTAttribute {
  trait_type: string;
  value: string;
}

export interface IMarketNFT {
  image?: string;
  description?: string;
  tokenId: string;
  tokenContractHash: string;
  status: string;
  listingAmount: number;
  sellerAccountHash: string;
  metadata: {
    name: string;
  };
  attributes: IMarketNFTAttribute[];
}

export interface IMarketContract {
  royaltyFee: number;
}

export type IMarketNFTsResponse = ListResponse<IMarketNFT>;

export type GetMarketNFTsParams = {
  page: number;
  limit: number;
};
