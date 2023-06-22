import ConfirmModal from '../ConfirmModal';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateStakeUndelegate } from '@/hooks/mutates/useMutateStakeUndelegate';
import { IValidator } from '@/hooks/queries/useGetValidators';
import { useAccount } from '@/hooks/useAccount';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

type Props = {
  validator: IValidator;
  amount: number;
  isOpen: boolean;
  onClose: () => void;
};
export const ReviewConfirmModal = ({
  validator,
  isOpen,
  amount,
  onClose,
}: Props) => {
  const { toastSuccess } = useI18nToast();
  const { publicKey } = useAccount();
  const { mutate, isLoading } = useMutateStakeUndelegate(
    validator.validatorPublicKey,
    {
      onSuccess: () => {
        toastSuccess('success');
        onClose();
      },
    }
  );

  const handleOnSend = async () => {
    if (!publicKey) {
      return;
    }

    mutate({
      fromPublicKeyHex: publicKey,
      validatorPublicKeyHex: validator.validatorPublicKey,
      amount,
      fee: 2.5,
    });
  };

  return (
    <UnlockWalletPopupRequired>
      <ConfirmModal
        action="unstake"
        isOpen={isOpen}
        onClose={onClose}
        values={{
          amount,
          validator,
        }}
        onConfirm={handleOnSend}
        isLoading={isLoading}
      />
    </UnlockWalletPopupRequired>
  );
};
