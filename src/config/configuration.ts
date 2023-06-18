const {
  VITE_CASPERDASH_BASE_API_URL,
  VITE_NETWORK_NAME,
  VITE_AIRDROP_BASE_URL,
  VITE_IS_DEBUG,
} = import.meta.env;

export const Config = {
  coingeckoBaseUrl: 'https://api.coingecko.com/api/v3',
  casperDashBaseUrl:
    VITE_CASPERDASH_BASE_API_URL || 'https://api.casperdash.io',
  airdropBaseUrl: VITE_AIRDROP_BASE_URL || 'https://airdrop.casperdash.io/v1',
  networkName: VITE_NETWORK_NAME || 'casper',
  csprLiveUrl: 'https://testnet.cspr.live',
  isDebug: VITE_IS_DEBUG || false,
};
