import { GetAccountsParams, GetAccountsResponse } from './type';
import request from '../request';

export const getAccounts = async ({
  publicKeys,
}: GetAccountsParams): Promise<GetAccountsResponse> => {
  return request.post('/users', { publicKeys });
};
