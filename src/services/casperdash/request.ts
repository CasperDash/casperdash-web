import axios, { AxiosResponse } from 'axios';

import { Config } from '@/config';

const casperDashRequest = axios.create({
  baseURL: Config.casperDashBaseUrl,
  timeout: 30 * 1000,
});

casperDashRequest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const { status } = error.response;

    if (status === 400) {
      const {
        data: { message },
      } = error.response;

      alert(message);
    }

    return Promise.reject(error);
  }
);

export default casperDashRequest;
