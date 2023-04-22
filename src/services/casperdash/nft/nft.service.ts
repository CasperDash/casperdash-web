import { INFTInfo } from './type';
import request from '@/services/casperdash/request';

export const getNFTs = async (publicKey?: string): Promise<INFTInfo[]> => {
  const data: INFTInfo[] = await request.get(`/nfts/getNFTsInfo`, {
    params: { publicKey },
  });

  return data;
};
