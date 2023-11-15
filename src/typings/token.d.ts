export type Token = {
  name: string;
  tokenAddress: string;
  icon?: string;
  symbol: string;
  decimals: number;
  balance?: number;
  totalBalanceInUsd?: number;
  price?: number;
};
