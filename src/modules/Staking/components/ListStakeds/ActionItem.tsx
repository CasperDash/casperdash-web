import { useState } from 'react';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { ReviewConfirmModal } from './ReviewConfirmModal';
import UndelegateModal from './UndelegateModal';
import { IValidator } from '@/hooks/queries/useGetValidators';
import i18n from '@/i18n';

type StakedActionItemProps = {
  validator: IValidator;
  amount: number;
};

const StakedActionItem = ({ validator, amount }: StakedActionItemProps) => {
  const [amountUndelegate, setAmountUndelegate] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenInput,
    onOpen: onOpenInput,
    onClose: onCloseInput,
  } = useDisclosure();

  const handleOnConfirm = ({ amount: amountInput }: { amount: number }) => {
    setAmountUndelegate(amountInput);
    onCloseInput();
    onOpen();
  };

  return (
    <Flex justifyContent={'flex-end'}>
      <Button
        w={{ base: 'auto', md: '5xs' }}
        size="sm"
        variant={'light-outline'}
        onClick={() => onOpenInput()}
      >
        {i18n.t('undelegate')}
      </Button>
      <ReviewConfirmModal
        validator={validator}
        isOpen={isOpen}
        onClose={onClose}
        amount={amountUndelegate}
      />
      <UndelegateModal
        max={amount}
        isOpen={isOpenInput}
        onClose={onCloseInput}
        onConfirm={handleOnConfirm}
        validator={validator}
      />
    </Flex>
  );
};

export default StakedActionItem;
