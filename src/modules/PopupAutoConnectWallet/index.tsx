import { useEffect } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import ModalConnectWallet from '../core/ModalConnectWallet';
import { PathEnum } from '@/enums';
import { useUpdateAccount } from '@/hooks/useUpdateAccount';
import casperUserUtil from '@/utils/casper/casperUser';

const PopupAutoConnectWallet = () => {
  const location = useLocation();
  const { updateAccount } = useUpdateAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (
      [
        PathEnum.IMPORT_WALLET,
        PathEnum.NEW_WALLET,
        PathEnum.IMPORT_WALLET_NEW_PASSWORD,
        PathEnum.DOUBLE_CHECK,
        PathEnum.NEW_PASSWORD,
      ].includes(location.pathname as PathEnum)
    ) {
      return;
    }
    const publicKey = casperUserUtil.getCachedPublicKey();
    const loginOptions = casperUserUtil.getCachedLoginOptions();

    if (publicKey) {
      updateAccount({
        publicKey,
        uid: loginOptions?.selectedWallet.uid,
      });

      return;
    }

    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ModalConnectWallet isOpen={isOpen} onClose={onClose} />;
};

export default PopupAutoConnectWallet;
