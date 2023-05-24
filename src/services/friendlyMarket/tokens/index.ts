import axios from 'axios';

import { ListTokenResponse } from './type';
import { Config } from '@/config';

export const getListTokens = async () => {
  const { data = { tokens: [] } } = await axios.get<ListTokenResponse>(
    Config.tokenListUrl
  );

  return data.tokens;
};

export * from './type';
