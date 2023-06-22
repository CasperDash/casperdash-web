import { IValidator } from '@/hooks/queries/useGetValidators';

export type ConfirmModalValues = {
  amount: number;
  validator: IValidator;
};

export type ConfirmModalProps = {
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  values: ConfirmModalValues;
  action: 'stake' | 'unstake';
};
