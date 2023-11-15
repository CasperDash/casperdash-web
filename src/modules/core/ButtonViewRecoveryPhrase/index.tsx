import { Text, Image, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ModalRecoveryPhrase from './components/ModalRecoveryPhrase';
import UnlockWalletPopupRequired from '../UnlockWalletPopupRequired';
import BackupImg from '@/assets/img/ic-backup.png';
import ButtonMenuItem from '@/components/Common/ButtonMenuItem';

const ButtonViewRecoveryPhrase = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ButtonMenuItem
        leftIcon={<Image src={BackupImg} alt="empty" w={'16px'} h={'16px'} />}
        onClick={onOpen}
      >
        <Text fontSize={'sm'} ml="1">
          {t('recovery_phrase')}
        </Text>
      </ButtonMenuItem>
      <UnlockWalletPopupRequired>
        <ModalRecoveryPhrase isOpen={isOpen} onClose={onClose} />
      </UnlockWalletPopupRequired>
    </>
  );
};

export default ButtonViewRecoveryPhrase;
