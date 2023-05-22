import { TokenTypesEnum } from '@/enums/tokenTypes';

export type ListTokenResponse = {
  tokens: Token[];
};

export type Token = {
  chainId: number;
  type: TokenTypesEnum;
  contractPackageHash: string;
  contractHash: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  coingeckoId?: string;
  amount?: number;
  amountInUSD?: number;
  balance?: number;
};
