import { GetDelegatorRewardsParams, GetDelegatorRewardsResponse } from './type';
import request from '../request';

export const getDelegatorRewards = async (
  params: GetDelegatorRewardsParams
): Promise<GetDelegatorRewardsResponse> => {
  return request.get(`/delegators/${params.publicKey}/rewards`, {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
};

export const getTotalReward = async (publicKey: string): Promise<number> => {
  const { data } = await request.get(`/delegators/${publicKey}/total-rewards`);

  return data;
};
