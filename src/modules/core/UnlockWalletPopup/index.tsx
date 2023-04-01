import { Box, useDisclosure } from '@chakra-ui/react';

import PasswordFormModal from './components/PasswordModal';
import { useI18nToast } from '@/hooks/useI18nToast';
import { useLoginWallet } from '@/hooks/useLoginWallet';

const UnlockWalletPopup = () => {
  const { toastError } = useI18nToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useLoginWallet({
    onLocked: () => {
      onOpen();
    },
  });

  const handleOnSuccess = () => {
    onClose();
  };

  const handleOnError = () => {
    toastError('error');
  };

  return (
    <Box>
      <PasswordFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={handleOnSuccess}
        onError={handleOnError}
      />
    </Box>
  );
};

export default UnlockWalletPopup;
