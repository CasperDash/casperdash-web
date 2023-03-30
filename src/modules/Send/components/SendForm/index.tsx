import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import SelectAssetField from './SelectAssetField';
import ReviewModal from '../ReviewModal';
import { useMutateSignDeploy } from '@/hooks/mutates/useMutateSignDeploy';
import { useI18nToast } from '@/hooks/useI18nToast';
import { publicKeySelector } from '@/store/wallet';

export type SubmitValues = {
  asset: string;
  transferAmount: number;
  receivingAddress: string;
  transferId: number;
  maxAssetAmount?: number;
};

const SendForm = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const publicKey = useSelector(publicKeySelector);
  const { toastError, toastSuccess } = useI18nToast();
  const { mutateAsync, isLoading } = useMutateSignDeploy();
  const methods = useForm<SubmitValues>({
    defaultValues: {
      asset: 'cspr',
      maxAssetAmount: 0,
      transferAmount: 0,
      receivingAddress: '',
      transferId: 0,
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = methods;

  const handleOnSubmit = (values: SubmitValues) => {
    console.log(values);
    onOpen();
  };

  const handleOnSend = async () => {
    const values = getValues();

    if (!publicKey) {
      toastError('public_key_does_not_exist');

      return;
    }

    await mutateAsync({
      fromPublicKeyHex: publicKey,
      toPublicKeyHex: values.receivingAddress,
      transferId: values.transferId,
      fee: 0.1,
      amount: values.transferAmount,
    });
    toastSuccess('signed_successfully');

    onClose();
  };

  const handleSetMaxAmount = () => {
    const values = getValues();
    setValue('transferAmount', _.get(values, 'maxAssetAmount', 0));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormControl>
          <FormLabel>
            <Text color="gray.500">{t('asset')}</Text>
          </FormLabel>
          <SelectAssetField />
        </FormControl>
        <FormControl mt="8" isInvalid={!!errors.transferAmount}>
          <FormLabel>
            <Text color="gray.500">{t('transfer_amount')}</Text>
          </FormLabel>
          <InputGroup>
            <Input
              type="number"
              {...register('transferAmount', { required: true })}
            />
            <InputRightElement h="100%" mr="6">
              <Button
                h="7"
                px="8"
                bg="primaryAlpha.300"
                onClick={handleSetMaxAmount}
              >
                {t('max')}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt="8" isInvalid={!!errors.receivingAddress}>
          <FormLabel>
            <Text color="gray.500">{t('receiving_address')}</Text>
          </FormLabel>

          <Input
            {...register('receivingAddress', {
              required: true,
            })}
          />
        </FormControl>
        <FormControl mt="8">
          <FormLabel>
            <Text color="gray.500">{t('transfer_id')}</Text>
          </FormLabel>
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
        isLoading={isLoading}
      />
    </FormProvider>
  );
};

export default SendForm;
