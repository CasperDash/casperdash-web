import * as React from 'react';

import {
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ReviewConfirmModal } from './ReviewConfirmModal';
import { FieldValues, validationSchema } from './validator';
import SelectValidators from '../SelectValidators';
import AssetText from '@/components/Common/AssetText';
import InputNumber from '@/components/Inputs/InputNumber';
import { useOnlineStatus } from '@/hooks/helpers/useOnlineStatus';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';

const StakingForm: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { offline } = useOnlineStatus();

  const methods = useForm<FieldValues>({
    defaultValues: {
      validator: undefined,
      balance: 0,
      amount: 0,
    },
    resolver: zodResolver(validationSchema),
  });
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  const handleOnSubmit = () => {
    onOpen();
  };

  React.useEffect(() => {
    if (balance) {
      setValue('balance', balance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Card
          mt={{ base: '6' }}
          pt={{ base: '8' }}
          pb={{ base: '6' }}
          px={{ base: '6' }}
          borderRadius={'4xl'}
          border={'1px'}
          borderColor={'gray.200'}
          shadow={'none'}
        >
          <FormControl isInvalid={!!errors?.amount}>
            <Flex justifyContent={'space-between'}>
              <FormLabel color={'gray.500'}>{t('amount')}</FormLabel>
              <Flex>
                <Text>{t('balance')}:</Text>
                <AssetText ml="2" value={balance} asset={'CSPR'} />
              </Flex>
            </Flex>

            <InputNumber
              {...register('amount', { valueAsNumber: true })}
              mt="2"
            />
            {errors?.amount && (
              <FormErrorMessage>{errors.amount.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={{ base: '8' }} isInvalid={!!errors?.validator}>
            <FormLabel color={'gray.500'}>{t('validator')}</FormLabel>
            <Controller
              control={control}
              name="validator"
              render={({ field }) => (
                <SelectValidators
                  {...field}
                  onSelect={(validator) => {
                    field.onChange(validator);
                  }}
                  value={field.value}
                />
              )}
            />
            {errors?.validator && (
              <FormErrorMessage>{errors.validator.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            type="submit"
            mt={{ base: 6 }}
            variant="primary"
            fontWeight={'semibold'}
            textTransform={'uppercase'}
            isDisabled={offline}
          >
            {t('stake_now')}
          </Button>
        </Card>
      </form>
      <ReviewConfirmModal isOpen={isOpen} onClose={onClose} />
    </FormProvider>
  );
};

export default StakingForm;
