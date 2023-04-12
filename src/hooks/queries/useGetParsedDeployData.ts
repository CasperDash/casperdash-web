import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { SignDeployParams } from '@/typings/signingParams';
import { parseDeployData } from '@/utils/casper/parser';

export const useGetParsedDeployData = (
  params: SignDeployParams,
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
