import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  Icon,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as _ from 'lodash-es';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsWallet2 } from 'react-icons/bs';
import { z } from 'zod';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateSubmitAirdropCode } from '@/hooks/mutates/useMutateSubmitAirdrop';
import { useGetAirdropCode } from '@/hooks/queries/useGetAirdropCode';
import { useAccount } from '@/hooks/useAccount';
import { validatePublicKey } from '@/utils/casper/validator';

const validationSchema = z.object({
  walletAddress: z
    .string()
    .nonempty('wallet_address_required')
    .default('')
    .refine((val) => {
      return validatePublicKey(val);
    }, 'invalid_wallet_address'),
  feedback: z
    .string()
    .min(20, 'feedback_min_required')
    .max(1000, 'feedback_max_required')
    .nonempty('feedback_required')
    .default(''),
});

type Props = BoxProps & {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

type SubmitValues = z.infer<typeof validationSchema>;

const FeedbackForm = ({ onSuccess, ...restProps }: Props) => {
  const { t } = useTranslation();
  const { publicKey } = useAccount();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<SubmitValues>({
    resolver: zodResolver(validationSchema),
  });
  const { toastSuccess } = useI18nToast();

  const submitAirdropCodeMutation = useMutateSubmitAirdropCode({
    onSuccess: (_data, variables) => {
      onSuccess?.();
      toastSuccess('airdrop_successfully_submitted');

      window.open(
        `https://twitter.com/intent/tweet?text=${variables.feedback}`,
        '_blank',
        'width=400,height=600'
      );
    },
  });
  const { data } = useGetAirdropCode();

  const handleOnPastePublicKey = () => {
    if (publicKey) {
      setValue('walletAddress', publicKey);
    }
  };

  const onSubmit = async (values: SubmitValues) => {
    if (!data?.airdropCode) {
      return;
    }
    submitAirdropCodeMutation.mutate({
      ...values,
      airdropCode: data?.airdropCode,
    });
  };

  return (
    <Box {...restProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mt="9" direction="column" justifyContent="center">
          <FormControl isInvalid={!!errors.walletAddress}>
            <FormLabel>
              <Text mb="4">{t('your_wallet_address')}:</Text>
            </FormLabel>
            <InputGroup>
              <Input {...register('walletAddress')} />

              <InputRightElement
                onClick={handleOnPastePublicKey}
                cursor="pointer"
                _hover={{
                  color: 'light',
                }}
              >
                <Icon as={BsWallet2} mt="2" />
              </InputRightElement>
            </InputGroup>
            {!!errors.walletAddress && (
              <FormErrorMessage>
                {t(
                  _.get(
                    errors,
                    'walletAddress.message',
                    'default_error_message'
                  )
                )}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.feedback} mt="4">
            <FormLabel>
              <Text mb="4">{t('feedback')}:</Text>
            </FormLabel>
            <Textarea
              {...register('feedback')}
              rows={5}
              placeholder={t('feedback_placeholder') || ''}
            />
            {!!errors.feedback && (
              <FormErrorMessage>
                {t(_.get(errors, 'feedback.message', 'default_error_message'))}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex mt="10">
          <Button
            type="submit"
            w="100%"
            variant="primary"
            isLoading={submitAirdropCodeMutation.isLoading}
          >
            {t('confirm')}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default FeedbackForm;
