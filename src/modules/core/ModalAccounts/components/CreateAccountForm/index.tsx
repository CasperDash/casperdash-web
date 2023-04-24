import { useEffect } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateAddAccount } from '@/hooks/mutates/useMutateAddAccount';
import { useGetAccounts } from '@/hooks/queries/useGetAccounts';

type SubmitValues = {
  name: string;
};

type CreateAccountFormProps = {
  onSuccess?: () => void;
};

export const CreateAccountForm = ({ onSuccess }: CreateAccountFormProps) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const { toastSuccess } = useI18nToast();
  const { data: accounts } = useGetAccounts();
  const { mutate, isLoading } = useMutateAddAccount({
    onSuccess: () => {
      toastSuccess('account_created');
      onSuccess?.();
    },
  });

  const onSubmit = (values: SubmitValues) => {
    mutate({
      name: values.name,
    });
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
            {t('account_name')}
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
      <Flex justifyContent="center" mt="6">
        <Button
          type="submit"
          isLoading={isSubmitting || isLoading}
          isDisabled={isSubmitting || isLoading}
          variant={'primary'}
          w="60%"
        >
          {t('create')}
        </Button>
      </Flex>
    </form>
  );
};
