import {
  CheckAirdropCodeParams,
  CheckAirdropCodeResponse,
  SubmitAirdropParams,
} from './type';
import request from '../request';

export const checkAirdropCode = async ({
  airdropCode,
}: CheckAirdropCodeParams): Promise<CheckAirdropCodeResponse> => {
  return request.post('/users/airdrop-code/check', { airdropCode });
};

export const submitAirdrop = async (
  params: SubmitAirdropParams
): Promise<void> => {
  return request.post('/users/airdrop/submit', params);
};
