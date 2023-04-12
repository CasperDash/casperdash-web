import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { JsonTypes } from 'typedjson';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { parseDeployData } from '@/utils/casper/parser';

type Params = {
  deploy: {
    deploy: JsonTypes;
  };
  signingPublicKeyHex: string;
  targetPublicKeyHex: string;
};

export const useGetParsedDeployData = (
  params: Params,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      Record<string, string | undefined>,
      [QueryKeysEnum.PARSED_DEPLOY_DATA, string | undefined]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...options,
    queryFn: async () => {
      const parsedDeployData = await parseDeployData(params);

      return parsedDeployData;
    },
    enabled: !!params.deploy,
  });
};
