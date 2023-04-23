import {
  Box,
  BoxProps,
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

import { useLoginWallet } from '@/hooks/useLoginWallet';

type Props = BoxProps & {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

type SubmitValues = {
  password: string;
};

const PasswordForm = ({ onSuccess, onError, ...restProps }: Props) => {
  const { t } = useTranslation();
  const { loginWallet, isLoading } = useLoginWallet({
    onSuccess,
    onError,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: SubmitValues) => {
    const { password } = values;
    loginWallet(password);
  };

  return (
    <Box {...restProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mt="9" direction="column" justifyContent="center">
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>
              <Text fontWeight="bold" mb="4">
                {t('password')}
              </Text>
            </FormLabel>
            <Input
              type="password"
              {...register('password', {
                required: 'password_required',
              })}
            />
            {!!errors.password && (
              <FormErrorMessage>
                {t(_.get(errors, 'password.message', 'default_error_message'))}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Box mt="10">
          <Button
            type="submit"
            w="100%"
            variant="primary"
            isLoading={isLoading}
          >
            {t('confirm')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PasswordForm;
