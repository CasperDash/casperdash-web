export type GetDelegatorRewardsParams = {
  page: number;
  limit: number;
  publicKey: string;
};

export type GetDelegatorRewardsResponse = {
  data: DelegatorReward[];
  pageCount: number;
  itemCount: number;
  pages: Page[];
};

export type GetTotalRewardResponse = {
  data: number;
};

export type DelegatorReward = {
  eraId: number;
  publicKey: string;
  validatorPublicKey: string;
  amount: string;
  timestamp: string;
  currency_amount: number;
  rate: number;
  current_currency_amount: number;
};

type Page = {
  number: number;
  url: string;
};
