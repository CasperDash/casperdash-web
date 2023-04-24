import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react';

import { ModalAccounts } from '../ModalAccounts';
import UnlockWalletPopupRequired from '../UnlockWalletPopupRequired';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useAccount } from '@/hooks/useAccount';

type MyAccountProps = ButtonProps;

export const MyAccount = ({ ...buttonProps }: MyAccountProps) => {
  const { publicKey = '' } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOnClick = () => {
    onOpen();
  };

  return (
    <>
      <Button onClick={handleOnClick} {...buttonProps}>
        <MiddleTruncatedText startLength={6} endLength={6} value={publicKey} />
      </Button>
      <UnlockWalletPopupRequired>
        <ModalAccounts isOpen={isOpen} onClose={onClose} />
      </UnlockWalletPopupRequired>
    </>
  );
};

export default MyAccount;
