export type GetPairParams = {
  fromContractHash: string;
  toContractHash: string;
};

export type GetPairResponse = {
  data: PairData | PairRouteData;
  error?: string;
};

export type PairRouteData = {
  path: string[];
  token0IntPair: PairData;
  intToken1Pair: PairData;
  isUsingRouting?: boolean;
};

export type PairData = {
  reserve0: string;
  reserve1: string;
  pairContractHash: string;
  pairContractPackageHash: string;
  token0: string;
  token1: string;
  decimals0: string;
  decimals1: string;
  symbol0: string;
  symbol1: string;
  token0Price: string;
  token1Price: string;
  volumeUSD: string;
  reserveUSD: string;
  untrackedVolumeUSD: string;
  token0Model: TokenModel;
  token1Model: TokenModel;
  totalSupply: string;
};

export type TokenModel = {
  _id: string;
  totalSupply: string;
  tradeVolume: string;
  tradeVolumeUSD: string;
  untrackedVolumeUSD: string;
  txCount: string;
  totalLiquidity: string;
  derivedCSPR: string;
  tokenDayData: string;
  pairDayDataBase: string;
  pairDayDataQuote: string;
  pairBase: string;
  pairQuote: string;
  deploys: unknown[];
  contractHash: string;
  contractPackageHash: string;
  symbol: string;
  name: string;
  decimals: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
