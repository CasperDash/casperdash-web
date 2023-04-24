export type Token = {
  name: string;
  tokenAddress: string;
  imageUrl?: string;
  symbol: string;
  decimals: number;
  balance?: number;
  totalBalanceInUsd?: number;
  price?: number;
};
