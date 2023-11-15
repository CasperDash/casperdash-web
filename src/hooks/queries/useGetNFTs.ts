import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { orderBy, isEmpty } from 'lodash-es';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getNFTs } from '@/services/casperdash/nft/nft.service';
import { IMetadata, INFTInfo } from '@/services/casperdash/nft/type';

type UseGetNFTsParams = {
  publicKey?: string;
  searchName?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  contractAddress?: string;
  tokenId?: string;
};

type Options = Omit<
  UseQueryOptions<
    unknown,
    unknown,
    INFTInfo[],
    [
      QueryKeysEnum.NFTS,
      string | undefined,
      Omit<UseGetNFTsParams, 'publicKey'>
    ]
  >,
  'queryKey' | 'queryFn'
>;

const getMetadataByKey = (metadata: IMetadata[], key: string) => {
  const data = metadata.find((item) => {
    if (key === 'image') {
      return item.key === 'image' && item.name !== 'token_uri';
    }

    return item.key === key;
  });
  return data?.value || '';
};

const isDefaultParams = ({ searchName, tokenId }: UseGetNFTsParams) => {
  if (tokenId) {
    return false;
  }
  if (isEmpty(searchName)) {
    return true;
  }

  return false;
};

export const useGetNFTs = (params: UseGetNFTsParams, options?: Options) => {
  const { publicKey, searchName, sortBy, order, contractAddress, tokenId } =
    params;
  const queryClient = useQueryClient();
  return useQuery(
    [
      QueryKeysEnum.NFTS,
      publicKey,
      { searchName, sortBy, order, contractAddress, tokenId },
    ],
    async () => {
      const cachedData = queryClient.getQueryData<INFTInfo[]>([
        QueryKeysEnum.NFTS,
        publicKey,
      ]);
      let data = [];

      if (!cachedData || isDefaultParams(params)) {
        data = await getNFTs(publicKey);
        queryClient.setQueryData<INFTInfo[]>(
          [QueryKeysEnum.NFTS, publicKey],
          data
        );
      } else {
        data = cachedData;
      }

      const massagedData = data.map((item) => ({
        ...item,
        nftName: getMetadataByKey(item.metadata, 'name') || item.tokenId,
        image: getMetadataByKey(item.metadata, 'image'),
        nftBackground: getMetadataByKey(item.metadata, 'background'),
        metadata: item.metadata.filter(
          (meta) =>
            meta.key !== 'name' &&
            meta.key !== 'image' &&
            meta.key !== 'background'
        ),
      }));

      let nfts = massagedData;
      if (contractAddress && tokenId) {
        nfts = massagedData.filter(
          (item) =>
            item.contractAddress === contractAddress && item.tokenId === tokenId
        );
      }
      if (searchName) {
        const fuse = new Fuse(massagedData, {
          keys: ['nftName', 'name', 'contractName'],
          threshold: 0.1,
        });
        nfts = fuse.search(searchName).map((result) => result.item);
      }
      if (sortBy && order) {
        nfts = orderBy(nfts, sortBy, order);
      }

      return nfts;
    },
    {
      networkMode: 'always',
      enabled: !!publicKey,
      ...options,
    }
  );
};
