import { Box, Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import RadioPercentSlippage from './RadioPercentSlippage';
import InputNumberField from '@/components/Inputs/InputNumberField';
import Modal from '@/components/Modal';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useGetSwapSettings } from '@/modules/Swap/hooks/useGetSwapSettings';
import { useMutateSwapSettings } from '@/modules/Swap/hooks/useMutateSwapSettings';

const validationSchema = z.object({
  slippage: z.number().refine((val) => val >= 0, 'slippage_required'),
  deadline: z.number().refine((val) => val >= 0, 'deadline_required'),
});

export type SubmitValues = z.infer<typeof validationSchema>;

type ModalTransactionSettingProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalTransactionSetting = ({
  isOpen,
  onClose,
}: ModalTransactionSettingProps) => {
  const { t } = useTranslation();
  const { toastSuccess } = useI18nToast();
  const { mutate, isLoading: isSubmitting } = useMutateSwapSettings({
    onSuccess: () => {
      toastSuccess('transaction_settings_saved');
      onClose();
    },
  });
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SubmitValues>({
    resolver: zodResolver(validationSchema),
  });
  useGetSwapSettings({
    onSuccess: (data) => {
      setValue('slippage', data.slippage);
      setValue('deadline', data.deadline);
    },
  });

  const handleOnSubmit = (data: SubmitValues) => {
    mutate(data);
  };

  console.log('errors: ', errors);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('transaction_settings')}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Box>
          <FormControl>
            <FormLabel color="gray.500">
              {t('slippage_tolerance')} (%)
            </FormLabel>
            <InputNumberField
              max={100}
              min={0}
              name="slippage"
              control={control}
            />
          </FormControl>
          <Box mt="3">
            <RadioPercentSlippage
              onChange={(value: number) => setValue('slippage', value)}
            />
          </Box>
        </Box>
        <FormControl mt="8">
          <FormLabel color="gray.500">
            {t('transaction_deadline')} ({t('minutes')})
          </FormLabel>
          <InputNumberField min={0} name="deadline" control={control} />
        </FormControl>
        <Flex>
          <Button
            variant={'primary'}
            mt="8"
            w="full"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            {t('save')}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default ModalTransactionSetting;
