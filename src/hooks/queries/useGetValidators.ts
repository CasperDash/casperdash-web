import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import Fuse from 'fuse.js';

import useDebounce from '../helpers/useDebounce';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import {
  getValidators,
  getValidatorsDetail,
} from '@/services/casperdash/staking/staking.service';
import {
  IValidatorDetailsResponse,
  IValidatorResponse,
} from '@/services/casperdash/staking/type';
import { getBase64IdentIcon } from '@/utils/identicon';

export interface IValidator extends IValidatorResponse {
  name?: string;
  description?: string;
  logo?: string;
  priority?: boolean;
  // this for select box
  value: string;
  isStaked?: boolean;
}

const massageValidators = (
  validators: IValidatorResponse[],
  validatorsDetail: IValidatorDetailsResponse
): IValidator[] => {
  return validators.map((validator: IValidatorResponse) => {
    const validatorDetail = validatorsDetail?.[validator.validatorPublicKey];
    return {
      ...validator,
      name: validatorDetail?.name,
      description: validatorDetail?.description,
      logo:
        validatorDetail?.logo ||
        getBase64IdentIcon(validator.validatorPublicKey),
      priority: validatorDetail?.priority,
      value: validator.validatorPublicKey,
    };
  });
};

const filterValidators = (
  massagedData: IValidator[],
  term?: string
): IValidator[] => {
  if (!term) {
    return massagedData;
  }
  if (!massagedData) {
    return [];
  }
  const fuse = new Fuse(massagedData, {
    keys: ['validatorPublicKey', 'name'],
    threshold: 0.1,
  });
  return fuse.search(term).map((result) => result.item);
};

export const useGetValidators = (
  searchTerm?: string,
  options?: Omit<
    UseQueryOptions<
      IValidator[],
      unknown,
      IValidator[],
      [QueryKeysEnum.VALIDATORS, { term: string | undefined }]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  const queryClient = useQueryClient();
  const searchTermDebounced = useDebounce<string>(searchTerm || '', 300);

  return useQuery({
    queryKey: [QueryKeysEnum.VALIDATORS, { term: searchTermDebounced }],
    queryFn: async () => {
      const validatorDetails = await getValidatorsDetail();
      const rawValidators = await getValidators();

      const validators = massageValidators(rawValidators, validatorDetails);

      queryClient.setQueryData([QueryKeysEnum.VALIDATORS], validators);

      return filterValidators(validators, searchTermDebounced);
    },
    refetchOnWindowFocus: false,
    ...options,
  });
};
