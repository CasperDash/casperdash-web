export type WalletAccount = {
  name: string;
  uid: string;
  publicKey: string;
};

export type WalletAccountBalance = {
  publicKey: string;
  balance: number;
};
