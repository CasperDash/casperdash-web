import {
  IAccountDelegationResponse,
  IValidatorDetailsResponse,
  IValidatorResponse,
} from './type';
import request from '@/services/casperdash/request';

export const getAccountDelegation = async (
  publicKey?: string
): Promise<IAccountDelegationResponse[]> => {
  if (!publicKey) {
    return [];
  }

  const data: IAccountDelegationResponse[] = await request.get(
    `/user/delegation/${publicKey}`
  );

  return data;
};

export const getValidatorsDetail =
  async (): Promise<IValidatorDetailsResponse> => {
    const data: IValidatorDetailsResponse = await request.get(
      '/validatorsDetail'
    );

    return data;
  };

export const getValidators = async (): Promise<IValidatorResponse[]> => {
  const data: IValidatorResponse[] = await request.get('/v3/validators');

  return data;
};
