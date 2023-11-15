import { Buffer } from 'buffer/';

import { Config } from '@/config';

export const getStakeAuctionHash = () => {
  return {
    auction: Uint8Array.from(Buffer.from(Config.auctionHash, 'hex')),
  };
};
