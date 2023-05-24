import axios from 'axios';

import { Config } from '@/config';

const request = axios.create({
  baseURL: Config.coingeckoBaseUrl,
  timeout: 30 * 1000,
});

request.interceptors.response.use(
  (response) => response.data,
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

export default request;
