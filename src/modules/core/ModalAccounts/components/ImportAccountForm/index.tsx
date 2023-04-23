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

type SubmitValues = {
  name: string;
};

export const ImportAccountForm = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: SubmitValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>
          <Text fontWeight="bold" mb="4">
            {t('new_password')}
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
      <Flex justifyContent="center">
        <Button
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          variant={'primary'}
        >
          {t('create')}
        </Button>
      </Flex>
    </form>
  );
};
