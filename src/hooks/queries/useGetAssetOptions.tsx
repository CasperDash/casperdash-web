import { Image } from '@chakra-ui/react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import CSPRCoin from '@/assets/img/coins/cspr.png';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';

type Option = {
  label: string;
  value: string;
  icon: React.ReactNode;
  amount: number;
};

const OPTIONS = [
  {
    label: 'CSPR',
    value: 'cspr',
    icon: <Image src={CSPRCoin} w="4" h="4" />,
    amount: 100,
  },
];

export const useGetAssetOptions = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, Option[], [QueryKeysEnum.ASSETS]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery(
    [QueryKeysEnum.ASSETS],
    () => {
      return OPTIONS;
    },
    {
      ...options,
    }
  );
};
