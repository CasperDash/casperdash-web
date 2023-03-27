import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ReviewModal from '../ReviewModal';
import SelectAsset from '@/components/Select/SelectIcon';
import { useI18nToast } from '@/hooks/useI18nToast';
import { publicKeySelector } from '@/store/wallet';
import { buildTransferDeploy } from '@/utils/casper/builder';

type SubmitValues = {
  asset: string;
  transferAmount: number;
  receivingAddress: string;
  transferId: number;
};

const SendForm = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const publicKey = useSelector(publicKeySelector);
  const { toastError, toastSuccess } = useI18nToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SubmitValues>({
    defaultValues: {
      asset: '',
      transferAmount: 0,
      receivingAddress: '',
      transferId: 0,
    },
  });

  const handleOnSubmit = (values: SubmitValues) => {
    console.log(values);
    onOpen();
  };

  const handleOnSend = () => {
    const values = getValues();

    if (!publicKey) {
      toastError('public_key_does_not_exist');

      return;
    }

    const deploy = buildTransferDeploy({
      fromPublicKeyHex: publicKey,
      toPublicKeyHex: values.receivingAddress,
      amount: values.transferAmount,
      transferId: values.transferId,
      fee: 0.1,
    });

    console.log('deploy: ', deploy);
    toastSuccess('signed_successfully');

    onClose();
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormControl>
          <FormLabel>{t('asset')}</FormLabel>
          <SelectAsset />
        </FormControl>
        <FormControl mt="8" isInvalid={!!errors.transferAmount}>
          <FormLabel>{t('transfer_amount')}</FormLabel>
          <Input
            type="number"
            {...register('transferAmount', { required: true })}
          />
        </FormControl>
        <FormControl mt="8" isInvalid={!!errors.receivingAddress}>
          <FormLabel>{t('receiving_address')}</FormLabel>
          <Input
            {...register('receivingAddress', {
              required: true,
            })}
          />
        </FormControl>
        <FormControl mt="8">
          <FormLabel>{t('transfer_id')}</FormLabel>
          <Input type="number" {...register('transferId')} />
        </FormControl>
        <Box mt="8">
          <Text>{t('network_fee', { total: 0.1, symbol: 'CSPR' })}</Text>
        </Box>
        <Box mt="8">
          <Button
            type="submit"
            w="100%"
            variant="primary"
            isLoading={isSubmitting}
          >
            {t('confirm')}
          </Button>
        </Box>
      </form>
      <ReviewModal
        isOpen={isOpen}
        onClose={onClose}
        values={getValues()}
        onSend={handleOnSend}
        isLoading={false}
      />
    </>
  );
};

export default SendForm;
