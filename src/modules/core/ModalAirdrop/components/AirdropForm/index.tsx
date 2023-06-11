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
import { AxiosError } from 'axios';
import * as _ from 'lodash-es';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateCheckAirdropCode } from '@/hooks/mutates/useMutateCheckAirdropCode';

type Props = BoxProps & {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

type SubmitValues = {
  code: string;
};

const AirdropForm = ({ onSuccess, ...restProps }: Props) => {
  const { t } = useTranslation();
  const { toastError } = useI18nToast();
  const checkAirdropCodeMutation = useMutateCheckAirdropCode({
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      toastError(
        _.get(error, 'response.data.message', 'default_error_message')
      );
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (values: SubmitValues) => {
    const { code } = values;

    checkAirdropCodeMutation.mutate({
      airdropCode: code,
    });
  };

  return (
    <Box {...restProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mt="9" direction="column" justifyContent="center">
          <FormControl isInvalid={!!errors.code}>
            <FormLabel>
              <Text fontWeight="bold" mb="4">
                {t('code')}
              </Text>
            </FormLabel>
            <Input
              {...register('code', {
                required: 'code_required',
              })}
            />
            {!!errors.code && (
              <FormErrorMessage>
                {t(_.get(errors, 'code.message', 'default_error_message'))}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex mt="10">
          <Button
            type="submit"
            w="100%"
            variant="primary"
            isLoading={checkAirdropCodeMutation.isLoading}
          >
            {t('confirm')}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default AirdropForm;
