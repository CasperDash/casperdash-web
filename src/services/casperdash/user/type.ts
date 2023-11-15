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
  balance: {
    hex: string;
    type: string;
  };
  publicKey: string;
};

export type GetAccountsResponse = Account[];

export type GetAccountsParams = {
  publicKeys: string[];
};

export type TBalance = {
  hex: string;
  type: string;
};
