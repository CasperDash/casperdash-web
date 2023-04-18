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
import { useForm, ValidateResult } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PathEnum } from '@/enums';
import { useConnectToDapp } from '@/hooks/postMesasges/useConnectToDapp';
import { useI18nToast } from '@/hooks/useI18nToast';
import { useAppDispatch } from '@/store';
import { originUrlSelector } from '@/store/sdk';
import {
  encryptionTypeSelector,
  masterKeySelector,
  updatePublicKeyAfterCreateWallet,
} from '@/store/wallet';
import casperUserUtil from '@/utils/casper/casperUser';

type Props = BoxProps;

type SubmitValues = {
  newPassword: string;
  confirmPassword?: string;
};

const NewPasswordForm = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const masterKey = useSelector(masterKeySelector);
  const encryptionType = useSelector(encryptionTypeSelector);
  const { toastSuccess, toastError } = useI18nToast();
  const connectToDApp = useConnectToDapp();
  const originUrl = useSelector(originUrlSelector);

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SubmitValues) => {
    const { newPassword: password } = values;
    if (!password) {
      toastError('password_is_empty');

      return;
    }

    if (!masterKey) {
      toastError('master_key_is_empty');

      return;
    }

    if (!encryptionType) {
      toastError('encryption_type_is_empty');

      return;
    }

    try {
      const { publicKey } = await casperUserUtil.createNewUser({
        password: values.newPassword,
        keyphrase: masterKey,
        encryptionType,
      });

      dispatch(updatePublicKeyAfterCreateWallet(publicKey));
      if (originUrl) {
        connectToDApp(originUrl, publicKey);
      }

      toastSuccess('create_new_wallet_success');

      navigate(PathEnum.HOME);
    } catch (err) {
      toastError('please_try_other_password');
    }
  };

  return (
    <Box {...restProps} w="340px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mt="9" direction="column" justifyContent="center">
          <FormControl isInvalid={!!errors.newPassword}>
            <FormLabel>
              <Text fontWeight="bold" mb="4">
                {t('new_password')}
              </Text>
            </FormLabel>
            <Input
              type="password"
              {...register('newPassword', {
                required: 'password_required',
              })}
            />
            {!!errors.newPassword && (
              <FormErrorMessage>
                {t(
                  _.get(errors, 'newPassword.message', 'default_error_message')
                )}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt="5" isInvalid={!!errors.confirmPassword}>
            <FormLabel>
              <Text fontWeight="bold" mb="4">
                {t('confirm_password')}
              </Text>
            </FormLabel>
            <Input
              type="password"
              {...register('confirmPassword', {
                required: 'password_required',
                validate: {
                  checkEqualNewPassword: (value: string): ValidateResult => {
                    const newPassword = watch('newPassword');
                    if (value !== newPassword) {
                      return 'password_does_not_match';
                    }

                    return true;
                  },
                },
              })}
            />
            {!!errors.confirmPassword && (
              <FormErrorMessage>
                {t(
                  _.get(
                    errors,
                    'confirmPassword.message',
                    'default_error_message'
                  )
                )}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex mt="20" justifyContent="center">
          <Button
            type="submit"
            w="80%"
            variant="primary"
            isLoading={isSubmitting}
          >
            {t('register')}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default NewPasswordForm;
