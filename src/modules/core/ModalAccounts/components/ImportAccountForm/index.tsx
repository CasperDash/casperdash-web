import { useEffect } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateAddLeagcyAccount } from '@/hooks/mutates/useMutateAddLegacyAccount';
import { useGetAccounts } from '@/hooks/queries/useGetAccounts';

type SubmitValues = {
  name: string;
  privateKey: string;
};

type ImportAccountFormProps = {
  onSuccess?: () => void;
};

export const ImportAccountForm = ({ onSuccess }: ImportAccountFormProps) => {
  const { t } = useTranslation();
  const { toastSuccess } = useI18nToast();
  const { mutateAsync } = useMutateAddLeagcyAccount({
    onSuccess: () => {
      toastSuccess('account_imported');
      onSuccess?.();
    },
  });
  const { data: accounts } = useGetAccounts();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      privateKey: '',
    },
  });

  const onSubmit = async (values: SubmitValues) => {
    await mutateAsync(values);
  };

  useEffect(() => {
    if (!accounts) {
      return;
    }

    const { name } = getValues();
    if (!name || name === '') {
      setValue('name', `Account ${accounts.length + 1}`);
    }
  }, [accounts, getValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>
          <Text fontWeight="bold" mb="4">
            {t('name')}
          </Text>
        </FormLabel>
        <Input
          {...register('name', {
            required: 'name_required',
          })}
        />
        {!!errors.name && (
          <FormErrorMessage>
            {t(_.get(errors, 'newPassword.message', 'default_error_message'))}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.privateKey} mt="4">
        <FormLabel>
          <Text fontWeight="bold" mb="4">
            {t('private_key')}
          </Text>
        </FormLabel>
        <Textarea
          {...register('privateKey', {
            required: 'private_key_required',
          })}
          rows={6}
        />
        {!!errors.name && (
          <FormErrorMessage>
            {t(_.get(errors, 'newPassword.message', 'default_error_message'))}
          </FormErrorMessage>
        )}
      </FormControl>
      <Flex justifyContent="center" mt="6">
        <Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          variant={'primary'}
          w="60%"
        >
          {t('import')}
        </Button>
      </Flex>
    </form>
  );
};
