export interface IConfiguration {
  MOTE_RATE: number;
  API_VERSION: string;
  CSPR_TRANSFER_FEE: number;
  CSPR_AUCTION_DELEGATE_FEE: number;
  CSPR_AUCTION_UNDELEGATE_FEE: number;
  CSPR_AUCTION_REDELEGATE_FEE: number;
  TOKEN_TRANSFER_FEE: number;
  IPFS_GATEWAY: string;
  MIN_CSPR_DELEGATE_TO_NEW_VALIDATOR: number;
  MAX_DELEGATOR_PER_VALIDATOR: number;
  OLD_NFT_SMART_CONTRACT_ADDRESSES: string[];
  STAKE_AUCTION_HASH: string;
  SUPPORT_URL: string;
  DOCS_URL: string;
  PRIVACY_URL: string;
  UNDELEGATE_TIME_NOTICE: string;
  ENABLE_REDELEGATE: boolean;
  DISABLE_INCREASE_STAKE: boolean;
  DAPP_SUBMIT_URL: string;
  DAPP_WHITELIST_DOMAINS: string[];
  DELEGATE_TIME_NOTICE: string;
  ENABLE_BUY: boolean;
  ENABLE_BUY_IOS: boolean;
  ENABLE_BUY_ANDROID: boolean;
  MARKETPLACE_CONTRACT: IMarketplaceContract;
  MARKETPLACE_PLATFORM_FEE_PERCENT: number;
}

export interface IMarketplaceContract {
  contractHash: string;
  contractPackageHash: string;
}
