import request from '../request';

type GetCoinPriceParams = {
  id: string;
};

export const getCoinPrice = async ({ id }: GetCoinPriceParams) => {
  return request.get(`coins/${id}`);
};
