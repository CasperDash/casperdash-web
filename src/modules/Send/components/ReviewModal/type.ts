export type ReviewModalValues = {
  transferAmount: number;
  receivingAddress: string;
  transferId: number;
  asset: string;
};

export type ReviewModalProps = {
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSend?: (values: Partial<ReviewModalValues>) => void;
  values: Partial<ReviewModalValues>;
};
