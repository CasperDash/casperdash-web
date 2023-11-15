export enum PathEnum {
  HOME = '/',
  TRADE = '/trade',
  STAKING = '/staking',
  PORTFOLIO = '/portfolio',
  SEND = '/send',

  // My NFTs
  NFT = '/nfts',
  NFT_DETAIL = '/nfts/:contractAddress/:tokenId',

  // NFT Market
  NFT_MARKET = '/market',
  NFT_MARKET_DETAIL = '/market/:contractAddress/:tokenId',
  LIST_AN_NFT = '/market/list-an-nft',
  MY_LISTINGS = '/market/my-listings',

  // New wallet.
  NEW_WALLET = '/create',
  NEW_PASSWORD = '/create/new-password',
  DOUBLE_CHECK = '/create/double-check',

  // Import wallet.
  IMPORT_WALLET = '/import',
  IMPORT_WALLET_NEW_PASSWORD = '/import/new-password',

  // SDK.
  SDK = '/sdk',
  SDK_CONNECT_WALLET = '/sdk/connect-wallet',
}
