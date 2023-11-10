import {
  Button,
  ButtonProps,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PiUserSwitch } from 'react-icons/pi';

import { ModalAccounts } from '../ModalAccounts';
import UnlockWalletPopupRequired from '../UnlockWalletPopupRequired';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useAccount } from '@/hooks/useAccount';

type MyAccountProps = ButtonProps & {
  isButton?: boolean;
};

const MyAccount = ({ isButton, ...buttonProps }: MyAccountProps) => {
  const { t } = useTranslation();
  const { publicKey = '' } = useAccount();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOnClick = () => {
    onOpen();
  };

  return (
    <>
      {isButton ? (
        <Tooltip label={t('switch_account')} placement="left-end">
          <IconButton
            onClick={handleOnClick}
            ml="auto"
            isRound={true}
            variant="solid"
            aria-label="Done"
            w="46px"
            h="46px"
            fontSize="24px"
            shadow="shadow01"
            _hover={{
              bgColor: 'red.500',
              color: 'white',
            }}
            icon={<PiUserSwitch size={20} />}
          />
        </Tooltip>
      ) : (
        <Button onClick={handleOnClick} {...buttonProps}>
          <MiddleTruncatedText
            startLength={6}
            endLength={6}
            value={publicKey}
          />
        </Button>
      )}
      <UnlockWalletPopupRequired>
        <ModalAccounts isOpen={isOpen} onClose={onClose} />
      </UnlockWalletPopupRequired>
    </>
  );
};

export default MyAccount;
