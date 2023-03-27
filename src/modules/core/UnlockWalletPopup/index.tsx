import { Box, useDisclosure } from '@chakra-ui/react';

import PasswordFormModal from './components/PasswordModal';
import { useLoginWallet } from '@/hooks/useLoginWallet';

const UnlockWalletPopup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useLoginWallet({
    onLocked: () => {
      onOpen();
    },
  });

  return (
    <Box>
      <PasswordFormModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default UnlockWalletPopup;
