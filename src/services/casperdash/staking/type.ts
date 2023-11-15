export interface IAccountDelegationResponse {
  blockHeight?: number;
  validatorPublicKey: string;
  delegatorPublicKey: string;
  stakedAmount: string;
}

export interface IValidatorResponse {
  era: number;
  blockHeight: number;
  validatorPublicKey: string;
  weight: string;
  isActive: boolean;
  isFullDelegator: boolean;
  delegationRate: number;
}

export interface IValidatorDetail {
  name: string;
  description: string;
  logo?: string;
  priority?: boolean;
}

export interface IValidatorDetailsResponse {
  [key: string]: IValidatorDetail;
}
