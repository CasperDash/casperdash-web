import { ILatestPrice } from './type';
import request from '@/services/casperdash/request';

export const getCSPRMarketInfo = async (): Promise<ILatestPrice> => {
  const data: ILatestPrice = await request.get('/price/latest');
  return data;
};

export const getCSPRPriceHistories = async (): Promise<number[][]> => {
  const data: number[][] = await request.get('/price/history');
  return data;
};
