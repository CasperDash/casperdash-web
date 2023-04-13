import { useEffect } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import ModalConnectWallet from '../core/ModalConnectWallet';
import { PathEnum } from '@/enums';
import { useAppDispatch } from '@/store';
import { updatePublicKey } from '@/store/wallet';
import { CacheKeyEnum, localStorageUtil } from '@/utils/localStorage';

const PopupAutoConnectWallet = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
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
    const publicKey = localStorageUtil.get(CacheKeyEnum.PUBLIC_KEY);

    if (publicKey) {
      dispatch(updatePublicKey(publicKey));

      return;
    }

    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ModalConnectWallet isOpen={isOpen} onClose={onClose} />;
};

export default PopupAutoConnectWallet;
