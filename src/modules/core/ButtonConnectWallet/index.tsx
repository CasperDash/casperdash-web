import { Button, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ModalAccounts } from '../ModalAccounts';
import ModalConnectWallet from '../ModalConnectWallet';
import UnlockWalletPopupRequired from '../UnlockWalletPopupRequired';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { publicKeySelector } from '@/store/wallet';

export const ConnectWallet = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        variant="light-outline"
        onClick={() => onOpen()}
        display={{ base: 'flex', md: 'none' }}
      >
        {t('connect_wallet')}
      </Button>
      <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

type AccountManagementProps = {
  publicKey: string;
};

const AccountManagement = ({ publicKey }: AccountManagementProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOnClick = () => {
    onOpen();
  };

  return (
    <>
      <Button onClick={handleOnClick}>
        <MiddleTruncatedText value={publicKey} />
      </Button>
      <UnlockWalletPopupRequired>
        <ModalAccounts isOpen={isOpen} onClose={onClose} />
      </UnlockWalletPopupRequired>
    </>
  );
};

const ButtonConnectWallet = () => {
  const publicKey = useSelector(publicKeySelector);

  return (
    <>
      {publicKey ? (
        <AccountManagement publicKey={publicKey} />
      ) : (
        <>
          <ConnectWallet />
        </>
      )}
    </>
  );
};

export default ButtonConnectWallet;
