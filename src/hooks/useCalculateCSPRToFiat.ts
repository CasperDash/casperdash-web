import { useGetCSPRMarketInfo } from './queries/usePrice';

export const useCalculateCSPRToFiat = (totalCSPR: number) => {
  const {
    data: { price } = { price: 0 },
    isLoading,
    isSuccess,
  } = useGetCSPRMarketInfo();

  return {
    price,
    totalFiat: totalCSPR * price,
    isLoading,
    isSuccess,
  };
};
