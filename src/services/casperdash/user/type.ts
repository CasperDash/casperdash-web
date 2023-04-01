export type Account = {
  _accountHash: string;
  namedKeys: {
    name: string;
    key: string;
  }[];
  mainPurse: string;
  associatedKeys: {
    accountHash: string;
    weight: number;
  }[];
  actionThresholds: {
    deployment: number;
    keyManagement: number;
  };
  balance: number;
  publicKey: string;
};

export type GetAccountsResponse = Account[];

export type GetAccountsParams = {
  publicKeys: string[];
};