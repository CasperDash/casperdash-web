import { Button, Image, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ModalRecoveryPhrase from './components/ModalRecoveryPhrase';
import UnlockWalletPopupRequired from '../UnlockWalletPopupRequired';
import BackupImg from '@/assets/img/ic-backup.png';

const ButtonViewRecoveryPhrase = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        variant="ghost"
        leftIcon={
          <Image src={BackupImg} alt="empty" width="10px" height="10px" />
        }
        p="6"
        w="100%"
        borderRadius="xl"
        onClick={() => onOpen()}
        justifyContent="flex-start"
      >
        {t('recovery_phrase')}
      </Button>
      <UnlockWalletPopupRequired>
        <ModalRecoveryPhrase isOpen={isOpen} onClose={onClose} />
      </UnlockWalletPopupRequired>
    </>
  );
};

export default ButtonViewRecoveryPhrase;
