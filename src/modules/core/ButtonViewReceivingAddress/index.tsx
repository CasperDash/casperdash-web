import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ModalReceivingAddress from './components/ModalReceivingAddress';

type Props = ButtonProps;

const ButtonViewReceivingAddress = ({ ...buttonProps }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button {...buttonProps} onClick={() => onOpen()}>
        {t('receive')}
      </Button>
      <ModalReceivingAddress isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ButtonViewReceivingAddress;
