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
} from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';

import SelectAssetField from './SelectAssetField';
import { FieldValues } from './validationSchema';

const FormContent = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    control,
  } = useFormContext<FieldValues>();
  const assetWatched = useWatch({
    control,
    name: 'asset',
  });

  const handleSetMaxAmount = () => {
    const values = getValues();
    setValue('transferAmount', _.get(values, 'maxAssetAmount', 0));
  };

  return (
    <>
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
              _.get(errors, 'transferAmount.message', 'default_error_message'),
              {
                asset: assetWatched,
              }
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
              _.get(errors, 'receivingAddress.message', 'default_error_message')
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
    </>
  );
};

export default FormContent;
