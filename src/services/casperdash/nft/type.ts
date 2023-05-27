import { TBalance } from '../user';

export interface IMetadata {
  key: string;
  value: string;
}

export interface INFTInfo {
  tokenId: string;
  contractName: string;
  contractAddress: string;
  metadata: IMetadata[];
  ownerAccountHash: string;
  symbol: string;
  name: string;
  totalSupply: TBalance;
  image?: string;
  nftName?: string;
  background?: string;
}
