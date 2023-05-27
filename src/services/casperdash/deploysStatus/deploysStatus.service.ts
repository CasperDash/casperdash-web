import { DeploysStatusParams, DeploysStatusResponse } from './type';
import request from '../request';

export const getDeployStatuses = async (
  params: DeploysStatusParams
): Promise<DeploysStatusResponse> => {
  return request.get('/deploysStatus', {
    params,
  });
};
