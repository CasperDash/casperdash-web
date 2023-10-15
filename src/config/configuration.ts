const {
  VITE_CASPERDASH_BASE_API_URL,
  VITE_NETWORK_NAME,
  VITE_AIRDROP_BASE_URL,
  VITE_IS_DEBUG,
  VITE_AUCTION_HASH,
  VITE_CSPR_BASE_URL,
  VITE_CSPR_LIVE_URL,
} = import.meta.env;

export const Config = {
  casperDashBaseUrl:
    VITE_CASPERDASH_BASE_API_URL || 'https://api.casperdash.io',
  airdropBaseUrl: VITE_AIRDROP_BASE_URL || 'https://airdrop.casperdash.io/v1',
  networkName: VITE_NETWORK_NAME || 'casper',
  isDebug: VITE_IS_DEBUG || false,
  csprLiveUrl: VITE_CSPR_LIVE_URL || 'https://testnet.cspr.live',
  csprBaseUrl: VITE_CSPR_BASE_URL || 'https://api.cspr.live',
  auctionHash:
    VITE_AUCTION_HASH ||
    'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea',
  contracts: {
    vkMarketplace: {
      contractHash:
        'hash-291038747f38bbdb4f21c4e6374578ceb45a4c187cca36113d4b64028ed1e508',
      contractPackageHash:
        'hash-fa43a585efc7372e63833299ff64100928d23ec17ed62020282448a29f68afc0',
    },
  },
  marketPlatformFeePercent: 2,
};
