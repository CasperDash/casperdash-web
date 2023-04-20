const { VITE_CASPERDASH_BASE_API_URL, VITE_NETWORK_NAME } = import.meta.env;

export const Config = {
  coingeckoBaseUrl: 'https://api.coingecko.com/api/v3',
  casperDashBaseUrl:
    VITE_CASPERDASH_BASE_API_URL || 'https://api.casperdash.io',
  networkName: VITE_NETWORK_NAME || 'casper',
  csprLiveUrl: 'https://testnet.cspr.live',
};
