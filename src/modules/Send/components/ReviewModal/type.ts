export type ReviewModalValues = {
  transferAmount: number;
  receivingAddress: string;
  transferId: number;
  asset: string;
  fee: number;
};

export type ReviewModalProps = {
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSend?: (values: Partial<ReviewModalValues>) => void;
  values: Partial<ReviewModalValues>;
};

export type ReviewModalContentProps = {
  onSubmit?: (values: Partial<ReviewModalValues>) => void;
} & Pick<ReviewModalProps, 'values' | 'isLoading'>;
