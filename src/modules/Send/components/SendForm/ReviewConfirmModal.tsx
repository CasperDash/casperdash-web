import { useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { FieldValues } from './validationSchema';
import ReviewModal from '../ReviewModal';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateSendCSPR } from '@/hooks/mutates/useMutateSendCSPR';
import { useMutateSendToken } from '@/hooks/mutates/useMutateSendToken';
import { useAccount } from '@/hooks/useAccount';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const ReviewConfirmModal = ({ isOpen, onClose }: Props) => {
  const { publicKey } = useAccount();
  const { toastError, toastSuccess } = useI18nToast();
  const { getValues } = useFormContext<FieldValues>();
  const queryClient = useQueryClient();

  const { mutateAsync: mutateSendCSPRAsync, isLoading: isSendingCSPR } =
    useMutateSendCSPR({
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          QueryKeysEnum.ACCOUNT_BALANCES,
          publicKey,
        ]);

        const values = getValues();
        toastSuccess('send_asset', { asset: values.asset });
      },
    });
  const { mutateAsync: mutateSendTokenAsync, isLoading: isSendingToken } =
    useMutateSendToken({
      onSuccess: async () => {
        await queryClient.invalidateQueries([QueryKeysEnum.ASSETS]);

        const values = getValues();
        toastSuccess('send_asset', { asset: values.asset });
      },
    });

  const handleOnSend = async () => {
    const values = getValues();

    if (!publicKey) {
      toastError('public_key_does_not_exist');

      return;
    }

    console.log('values', values);

    if (!values.isToken) {
      await mutateSendCSPRAsync({
        fromPublicKeyHex: publicKey,
        toPublicKeyHex: values.receivingAddress,
        transferId: values.transferId,
        fee: values.fee,
        amount: values.transferAmount,
      });
    } else if (values.tokenAddress) {
      await mutateSendTokenAsync({
        fromPublicKeyHex: publicKey,
        toPublicKeyHex: values.receivingAddress,
        contractHash: values.tokenAddress,
        fee: values.fee,
        amount: values.transferAmount,
        asset: values.asset,
      });
    }
    onClose();
  };

  return (
    <UnlockWalletPopupRequired>
      <ReviewModal
        isOpen={isOpen}
        onClose={onClose}
        values={getValues()}
        onSend={handleOnSend}
        isLoading={isSendingCSPR || isSendingToken}
      />
    </UnlockWalletPopupRequired>
  );
};
