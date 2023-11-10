import { IConfiguration } from './type';
import request from '../request';

export const getConfigurations = async (): Promise<IConfiguration> => {
  return request.get(`/configurations`);
};
