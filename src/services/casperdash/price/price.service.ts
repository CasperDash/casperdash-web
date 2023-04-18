import { ILatestPrice } from './type';
import request from '@/services/casperdash/request';

export const getCSPRPrice = async (): Promise<ILatestPrice> => {
  const data: ILatestPrice = await request.get('/price/latest');
  return data;
};

export const getPriceHistories = async (): Promise<number[][]> => {
  const data: number[][] = await request.get('/price/history');
  return data;
};
