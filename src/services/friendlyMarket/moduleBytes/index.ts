import axios from 'axios';

import { Config } from '@/config';

export const getSwapModuleBytes = async (): Promise<string> => {
  const { data } = await axios.get(Config.friendlyMarketModuleBytesUrl);

  return data;
};
