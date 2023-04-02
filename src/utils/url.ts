import { Config } from '@/config';

export const getDeployHashUrl = (deployHash: string) => {
  return `${Config.csprLiveUrl}/deploy/${deployHash}`;
};
