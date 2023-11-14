import { useDisclosure } from '@chakra-ui/react';

import ModalAirdrop from '../core/ModalAirdrop';
import { useGetAirdropCode } from '@/hooks/queries/useGetAirdropCode';

const PopupAirdrop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useGetAirdropCode({
    onError: () => {
      onOpen();
    },
  });

  return <ModalAirdrop isOpen={isOpen} onClose={onClose} />;
};

export default PopupAirdrop;
