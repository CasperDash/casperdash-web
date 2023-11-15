import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getMarketNFTs } from '@/services/casperdash/market/market.service';

type Params = {
  limit: number;
};

export const useFetchMarketNFTs = ({ limit }: Params) => {
  const result = useInfiniteQuery({
    queryKey: [QueryKeysEnum.MARKET_NFTS],
    queryFn: ({ pageParam = 1 }) => getMarketNFTs({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    refetchOnMount: 'always',
  });

  return {
    ...result,
    nfts: result.data?.pages.flatMap((page) => page.docs),
  };
};
