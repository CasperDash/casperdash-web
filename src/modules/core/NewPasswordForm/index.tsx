import { useEffect } from 'react';

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
import { zodResolver } from '@hookform/resolvers/zod';
import * as _ from 'lodash-es';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { PathEnum } from '@/enums';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useConnectToDapp } from '@/hooks/postMesasges/useConnectToDapp';
import { useSafeResetSensitive } from '@/hooks/useSafeResetSensitive';
import { useUpdateAccount } from '@/hooks/useUpdateAccount';
import i18n from '@/i18n';
import { originUrlSelector } from '@/store/sdk';
import {
  encryptionTypeSelector,
  masterKeyEntropySelector,
} from '@/store/wallet';
import casperUserUtil from '@/utils/casper/casperUser';
import { isDebug } from '@/utils/env';

type Props = BoxProps;

const passwordSchema = z
  .string()
  .nonempty(i18n.t('password_required') as string)
  .min(
    10,
    i18n.t('password_min_characters', {
      val: 10,
    }) as string
  )
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/,
    i18n.t('password_include_letters') as string
  );

const validationSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: i18n.t('password_does_not_match') as string,
    path: ['confirmPassword'],
  });

type SubmitValues = {
  newPassword: string;
  confirmPassword?: string;
};

const NewPasswordForm = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const masterKeyEntropy = useSelector(masterKeyEntropySelector);
  const encryptionType = useSelector(encryptionTypeSelector);
  const { toastSuccess, toastError } = useI18nToast();
  const connectToDApp = useConnectToDapp();
  const originUrl = useSelector(originUrlSelector);
  const { safeResetSensitive } = useSafeResetSensitive();

  const { updateAccount } = useUpdateAccount();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(validationSchema),
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

    if (!masterKeyEntropy) {
      toastError('master_key_is_empty');

      return;
    }

    if (!encryptionType) {
      toastError('encryption_type_is_empty');

      return;
    }

    try {
      const { publicKey, uid } = await casperUserUtil.createNewUser({
        password: values.newPassword,
        keyphrase: masterKeyEntropy,
        encryptionType,
      });

      updateAccount({
        publicKey,
        uid,
      });
      if (originUrl) {
        connectToDApp(originUrl, publicKey);
      }

      toastSuccess('create_new_wallet_success');
      safeResetSensitive();

      navigate(PathEnum.HOME);
    } catch (err) {
      toastError('please_try_other_password');
    }
  };

  useEffect(() => {
    return () => {
      // Reset form when unmount.
      reset();

      // Unmount run twice in strict mode.
      if (!isDebug()) {
        // Reset sensitive data when unmount.
        safeResetSensitive();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                {_.get(
                  errors,
                  'newPassword.message',
                  t('default_error_message')
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
              })}
            />
            {!!errors.confirmPassword && (
              <FormErrorMessage>
                {_.get(
                  errors,
                  'confirmPassword.message',
                  t('default_error_message')
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
            {t('confirm')}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default NewPasswordForm;
