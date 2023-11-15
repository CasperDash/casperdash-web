import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react';
import { AiOutlineQrcode } from 'react-icons/ai';

import ModalReceivingAddress from './components/ModalReceivingAddress';

type Props = ButtonProps;

const ButtonViewReceivingAddress = ({ ...buttonProps }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button {...buttonProps} onClick={() => onOpen()}>
        <AiOutlineQrcode />
      </Button>
      <ModalReceivingAddress isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ButtonViewReceivingAddress;
