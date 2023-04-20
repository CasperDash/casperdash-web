import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { orderBy } from 'lodash-es';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { getNFTs } from '@/services/casperdash/nft/nft.service';
import { IMetadata, INFTInfo } from '@/services/casperdash/nft/type';

const getMetadataByKey = (metadata: IMetadata[], key: string) => {
  const data = metadata.find((item) => item.key === key);
  return data?.value || '';
};

export const useGetNFTs = (
  publicKey?: string,
  searchName?: string,
  sortBy?: 'nftName' | 'contractName',
  order?: 'asc' | 'desc'
) => {
  const query = useQuery(
    [QueryKeysEnum.NFTS, publicKey],
    () => getNFTs(publicKey),
    { enabled: !!publicKey }
  );
  const massagedData = useMemo<INFTInfo[]>(() => {
    if (query.data) {
      return query.data.map((item) => ({
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
    }
    return [];
  }, [query.data]);

  const filteredData = useMemo<INFTInfo[]>(() => {
    let data = massagedData;
    if (searchName) {
      const fuse = new Fuse(massagedData, {
        keys: ['nftName', 'name', 'contractName'],
        threshold: 0.1,
      });
      data = fuse.search(searchName).map((result) => result.item);
    }
    if (sortBy && order) {
      data = orderBy(data, sortBy, order);
    }
    return data;
  }, [massagedData, searchName, sortBy, order]);
  return { ...query, data: massagedData, filteredData };
};
