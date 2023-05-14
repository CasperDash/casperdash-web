import { GetPairParams } from './type';
import request from '../request';

export const getPair = async ({
  fromContractHash,
  toContractHash,
}: GetPairParams) => {
  const { data = {} } = await request.get(
    `/amm/pair/${fromContractHash}/${toContractHash}`
  );

  return data;
};
