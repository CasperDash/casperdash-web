import { JsonTypes } from 'typedjson';

import { ISpeculativedDeployResult } from './type';
import request from '@/services/casperdash/request';

export const speculativeDeploy = async (
  deployJson?: JsonTypes
): Promise<ISpeculativedDeployResult> => {
  const data: ISpeculativedDeployResult = await request.post(
    `/v1/network/speculativeDeploy`,
    deployJson
  );

  return data;
};
