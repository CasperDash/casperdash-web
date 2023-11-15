import { StakingActionEnum } from '@/enums/staking';

type StakingTransactionHistory = {
  fromPublicKeyHex: string;
  validatorPublicKeyHex: string;
  amount: number;
  transferId?: number;
  fee: number;
  deployHash: string;
  status: string;
  date: string;
  action: StakingActionEnum;
};
