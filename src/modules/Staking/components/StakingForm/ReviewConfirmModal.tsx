import { useFormContext } from 'react-hook-form';

import { FieldValues } from './validator';
import ConfirmModal from '../ConfirmModal';
import { useMutateStakeDelegate } from '@/hooks/mutates/useMutateStakeDelegate';
import { useAccount } from '@/hooks/useAccount';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const ReviewConfirmModal = ({ isOpen, onClose }: Props) => {
  const { publicKey } = useAccount();
  const { getValues } = useFormContext<FieldValues>();
  const { mutate, isLoading } = useMutateStakeDelegate({
    onSettled: () => {
      onClose();
    },
  });

  const handleOnSend = async () => {
    const values = getValues();

    if (!publicKey) {
      return;
    }

    mutate({
      fromPublicKeyHex: publicKey,
      validatorPublicKeyHex: values.validator.validatorPublicKey,
      amount: values.amount,
      fee: 2.5,
    });
  };

  return (
    <UnlockWalletPopupRequired>
      <ConfirmModal
        action={'stake'}
        isOpen={isOpen}
        onClose={onClose}
        values={getValues()}
        onConfirm={handleOnSend}
        isLoading={isLoading}
      />
    </UnlockWalletPopupRequired>
  );
};
