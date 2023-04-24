import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { z } from 'zod';

import SelectAssetField from './SelectAssetField';
import ReviewModal from '../ReviewModal';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateSendAsset } from '@/hooks/mutates/useMutateSendAsset';
import { useAccount } from '@/hooks/useAccount';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

const transactionSchema = z
  .object({
    asset: z.string(),
    transferAmount: z
      .number()
      .min(2.5, 'min_transfer_amount_required')
      .max(1000000000),
    receivingAddress: z.string().nonempty('receiving_address_required'),
    transferId: z.number(),
    maxAssetAmount: z.number().optional(),
  })
  .refine((data) => data.transferAmount <= (data.maxAssetAmount || 0), {
    message: 'transfer_amount_is_not_enought',
    path: ['transferAmount'],
  });

export type SubmitValues = z.infer<typeof transactionSchema>;

const SendForm = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { publicKey } = useAccount();
  const { toastError, toastSuccess } = useI18nToast();
  const { mutateAsync, isLoading } = useMutateSendAsset();
  const methods = useForm<SubmitValues>({
    resolver: zodResolver(transactionSchema),
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
    control,
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
    toastSuccess('send_asset', { asset: 'CSPR' });

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
            <Controller
              name="transferAmount"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  as={NumericFormat}
                  thousandSeparator=","
                  decimalSeparator="."
                  value={value}
                  onValueChange={({ floatValue }: { floatValue?: number }) => {
                    onChange(floatValue);
                  }}
                />
              )}
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
          {!!errors.transferAmount && (
            <FormErrorMessage>
              {t(
                _.get(errors, 'transferAmount.message', 'default_error_message')
              )}
            </FormErrorMessage>
          )}
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
          {!!errors.receivingAddress && (
            <FormErrorMessage>
              {t(
                _.get(
                  errors,
                  'receivingAddress.message',
                  'default_error_message'
                )
              )}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl mt="8">
          <FormLabel>
            <Text color="gray.500">{t('transfer_id')}</Text>
          </FormLabel>
          <Controller
            name="transferId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                as={NumericFormat}
                value={value}
                onValueChange={({ floatValue }: { floatValue?: number }) => {
                  onChange(floatValue);
                }}
              />
            )}
          />
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
      <UnlockWalletPopupRequired>
        <ReviewModal
          isOpen={isOpen}
          onClose={onClose}
          values={getValues()}
          onSend={handleOnSend}
          isLoading={isLoading}
        />
      </UnlockWalletPopupRequired>
    </FormProvider>
  );
};

export default SendForm;
