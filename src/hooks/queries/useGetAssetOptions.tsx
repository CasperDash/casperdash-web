import { Image } from '@chakra-ui/react';
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import { useAccount } from '../useAccount';
import CSPRCoin from '@/assets/img/coins/cspr.png';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { Token } from '@/typings/token';

export type AssetOption = {
  label: string;
  value: string;
  icon: React.ReactNode;
  amount: number;
  tokenAddress?: string;
  isToken?: boolean;
};

const DEFAULT_OPTIONS = [
  {
    label: 'CSPR',
    value: 'CSPR',
    icon: <Image src={CSPRCoin} w="4" h="4" />,
    amount: 100,
    isToken: false,
  },
];

export const useGetAssetOptions = (
  options?: Omit<
    UseQueryOptions<unknown, unknown, AssetOption[], [QueryKeysEnum.ASSETS]>,
    'queryKey' | 'queryFn'
  >
) => {
  const { publicKey } = useAccount();
  const queryClient = useQueryClient();
  return useQuery(
    [QueryKeysEnum.ASSETS],
    () => {
      const tokens = queryClient.getQueryData<Token[]>([
        QueryKeysEnum.MY_TOKENS,
        publicKey,
      ]);
      if (tokens && tokens.length > 0) {
        return [
          ...DEFAULT_OPTIONS,
          ...tokens.map((token) => ({
            label: token.name,
            value: token.symbol,
            icon: <Image src={token.icon} w="4" h="4" />,
            amount: token.balance,
            tokenAddress: token.tokenAddress,
            isToken: true,
          })),
        ];
      }

      return DEFAULT_OPTIONS;
    },
    {
      ...options,
      networkMode: 'offlineFirst',
    }
  );
};
