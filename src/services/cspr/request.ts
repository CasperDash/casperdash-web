import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { Config } from '@/config';

const request = axios.create({
  baseURL: Config.csprBaseUrl,
  timeout: 100 * 1000,
  paramsSerializer: {
    serialize: (params: Record<string, unknown>) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});

request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const { status } = error.response;

    if (status === 400) {
      const {
        data: { message },
      } = error.response;

      console.log(message);
    }

    return Promise.reject(error);
  }
);

export default request;
