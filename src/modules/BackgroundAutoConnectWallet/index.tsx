import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { PathEnum } from '@/enums';
import { useUpdateAccount } from '@/hooks/useUpdateAccount';
import casperUserUtil from '@/utils/casper/casperUser';

const BackgroundAutoConnectWallet = () => {
  const location = useLocation();
  const { updateAccount } = useUpdateAccount();

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

    if (publicKey && loginOptions?.selectedWallet?.uid) {
      updateAccount({
        publicKey,
        uid: loginOptions?.selectedWallet.uid,
      });

      return;
    }

    if (!publicKey && loginOptions?.selectedWallet?.uid) {
      return;
    }

    // onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default BackgroundAutoConnectWallet;
