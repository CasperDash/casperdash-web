import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RadioPercentSlippage from './RadioPercentSlippage';
import Modal from '@/components/Modal';

type ModalTransactionSettingProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalTransactionSetting = ({
  isOpen,
  onClose,
}: ModalTransactionSettingProps) => {
  const { t } = useTranslation();
  const { handleSubmit, register } = useForm();

  const handleOnSubmit = () => {
    console.log('submit');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('transaction_settings')}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Box>
          <FormControl>
            <FormLabel color="gray.500">{t('slippage_tolerance')}</FormLabel>
            <Input {...register('slippage')} />
          </FormControl>
          <Box mt="8">
            <RadioPercentSlippage />
          </Box>
        </Box>
        <FormControl mt="8">
          <FormLabel color="gray.500">{t('transaction_deadline')}</FormLabel>
          <Input {...register('deadline')} />
        </FormControl>
      </form>
    </Modal>
  );
};

export default ModalTransactionSetting;
