import { IContractPackage } from './type';
import request from '../request';

export const getContractPackageInfo = async (
  contractPackageHash: string
): Promise<IContractPackage> => {
  return request.get(`/contractPackages/${contractPackageHash}`);
};
