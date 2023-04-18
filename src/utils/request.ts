import axios, { AxiosResponse } from 'axios';
console.log(
  '🚀 ~ file: request.ts:8 ~ import.meta.env.NEXT_PUBLIC_API_URL:',
  import.meta.env
);

const request = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL,
  timeout: 30 * 1000,
  withCredentials: true,
});

request.interceptors.response.use(
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

export default request;
