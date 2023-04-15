import { Button, useClipboard, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ModalConnectWallet from '../ModalConnectWallet';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useI18nToast } from '@/hooks/useI18nToast';
import { publicKeySelector } from '@/store/wallet';

const ButtonConnectWallet = () => {
  const { t } = useTranslation();
  const publicKey = useSelector(publicKeySelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toastSuccess } = useI18nToast();

  const { onCopy, setValue } = useClipboard(publicKey || '');

  const handleOnSwap = () => {
    setValue(publicKey || '');
    onCopy();
    toastSuccess('copy_public_key');
  };

  return (
    <>
      {publicKey ? (
        <Button onClick={handleOnSwap}>
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
    </>
  );
};

export default ButtonConnectWallet;
