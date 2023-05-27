import { DeployParams, DeployResponse } from './type';
import request from '../request';

export const deploy = async (
  signedDeploy: DeployParams
): Promise<DeployResponse> => {
  return request.post('/deploy', signedDeploy);
};
