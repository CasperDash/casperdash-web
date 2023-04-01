import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ModalConnectWallet from '../ModalConnectWallet';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useAppDispatch } from '@/store';
import { reset, publicKeySelector } from '@/store/wallet';

const ButtonConnectWallet = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const publicKey = useSelector(publicKeySelector);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {publicKey ? (
        <Button onClick={() => dispatch(reset())}>
          <MiddleTruncatedText value={publicKey} />
        </Button>
      ) : (
        <>
          <Button variant="light-outline" onClick={() => onOpen()}>
            {t('connect_wallet')}
          </Button>
          <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </Box>
  );
};

export default ButtonConnectWallet;
