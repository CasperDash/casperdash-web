import { GetPairParams, PairData, PairRouteData } from './type';
import request from '../request';

export const getPair = async ({
  fromContractHash,
  toContractHash,
}: GetPairParams): Promise<PairData | PairRouteData | undefined> => {
  const { data } = await request.get(
    `/amm/pair/${fromContractHash}/${toContractHash}`
  );

  return data;
};
