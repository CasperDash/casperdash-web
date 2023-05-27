export type GetTokenParams = {
  tokenAddress: string;
};

export type GetTokenResponse = {
  name: string;
  decimals: number;
  symbol: string;
  total_supply: number;
  address: string;
};

export type GetTokensInfoParams = {
  tokenAddress?: string[];
  publicKey: string;
};

export type TokenInfo = {
  address: string;
  balance: {
    type: string;
    hex: string;
  };
  name: string;
  symbol: string;
  total_supply: {
    type: string;
    hex: string;
  };
  decimals: {
    type: string;
    hex: string;
  };
};

export type GetTokensInfoResponse = TokenInfo[];
