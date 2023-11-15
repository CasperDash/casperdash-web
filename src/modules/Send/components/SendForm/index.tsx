import { useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import FormContent from './FormContent';
import { ReviewConfirmModal } from './ReviewConfirmModal';
import { FieldValues, validationSchema } from './validationSchema';

const SendForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm<FieldValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      asset: 'CSPR',
      maxAssetAmount: 0,
      transferAmount: 0,
      receivingAddress: '',
      transferId: 0,
      tokenAddress: '',
      isToken: false,
      fee: 0.1,
    },
  });
  const { handleSubmit } = methods;

  const handleOnSubmit = () => {
    onOpen();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormContent />
      </form>
      <ReviewConfirmModal isOpen={isOpen} onClose={onClose} />
    </FormProvider>
  );
};

export default SendForm;
