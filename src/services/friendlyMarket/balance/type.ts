export type GetBalanceParams = {
  publicKey: string;
  network?: string;
};

export type getErc20BalanceParams = {
  publicKey: string;
  contractHash: string;
  network?: string;
};

export type GetBalanceResponse = {
  balance?: number;
  error?: string;
};
