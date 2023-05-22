const { VITE_CASPERDASH_BASE_API_URL, VITE_NETWORK_NAME } = import.meta.env;

export const Config = {
  coingeckoBaseUrl: 'https://api.coingecko.com/api/v3',
  casperDashBaseUrl:
    VITE_CASPERDASH_BASE_API_URL || 'https://api.casperdash.io',
  networkName: VITE_NETWORK_NAME || 'casper',
  csprLiveUrl: 'https://testnet.cspr.live',
  friendlyMarketUrl: 'https://api.friendly.market/api/v1',
  tokenListUrl:
    'https://raw.githubusercontent.com/FriendlyMarket/token-list/main/tokenlist.json',
  friendlyMarketModuleBytesUrl:
    'https://s3.ap-southeast-1.amazonaws.com/assets.casperdash.io/sc-resources/gistfile1.txt',
  swapContractHash:
    'fa64806972777d6263dea1f0e5a908620ffd19113df57ebd9ea4aa4e23de6090',
};
