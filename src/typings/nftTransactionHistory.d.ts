import { DeployActionsEnum } from '@/enums/deployActions';
import { DeployContextEnum } from '@/enums/deployContext';
import { DeployTypesEnum } from '@/enums/deployTypes';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';

type NFTTransactionHistory = {
  action: DeployActionsEnum;
  fromPublicKeyHex: string;
  toPublicKeyHex?: string;
  type: DeployTypesEnum;
  paymentAmount: number;
  args: Record<string, string | number>;
  status: TransactionStatusEnum;
  date: string;
  entryPoint?: string;
  context: DeployContextEnum;
  deployHash: string;
  additionalInfos?: Record<string, string>;
};
