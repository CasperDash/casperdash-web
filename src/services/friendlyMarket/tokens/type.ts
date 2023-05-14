export type ListTokenResponse = {
  tokens: Token[];
};

export type Token = {
  chainId: number;
  type: string;
  contractPackageHash: string;
  contractHash: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  coingeckoId?: string;
};
