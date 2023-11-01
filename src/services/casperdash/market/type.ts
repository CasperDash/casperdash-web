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

export interface ITokenContract {
  _id: string;
  tokenContractHash: string;
  tokenContractPackageHash: string;
  tokenContractName: string;
  tokenContractVersion: number;
  tokenType: number;
  owner: string;
  royaltyFee: number;
  deployTimestamp: Date;
  createdAt: Date;
  updatedAt: Date;
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
