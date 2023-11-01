import { Button, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ModalConnectWallet from '../ModalConnectWallet';
import MyAccount from '../MyAccount';
import { publicKeySelector } from '@/store/wallet';

export const ConnectWallet = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        size="md"
        variant="solid"
        colorScheme="red"
        onClick={() => onOpen()}
      >
        {t('connect_wallet')}
      </Button>

      <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const ButtonConnectWallet = () => {
  const publicKey = useSelector(publicKeySelector);

  return (
    <>
      {publicKey ? (
        <MyAccount />
      ) : (
        <>
          <ConnectWallet />
        </>
      )}
    </>
  );
};

export default ButtonConnectWallet;
