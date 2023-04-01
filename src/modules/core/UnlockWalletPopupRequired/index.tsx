import { ReactElement, cloneElement, isValidElement, useEffect } from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';

import PasswordFormModal from './components/PasswordModal';
import { useI18nToast } from '@/hooks/useI18nToast';

type Props = {
  children: React.ReactNode;
};

/**
 * TODO: Refactor later with promise modal.
 * @param param0
 * @returns
 */
const UnlockWalletPopupRequired = ({ children }: Props) => {
  const { toastError } = useI18nToast();
  const {
    isOpen: isOpenPasswordRequired,
    onOpen: onOpenPasswordRequired,
    onClose: onClosePasswordRequired,
  } = useDisclosure();

  const {
    isOpen: isOpenChildren,
    onOpen: onOpenChildren,
    onClose: onCloseChildren,
  } = useDisclosure();

  const { onClose, isOpen } = (children as ReactElement).props;

  useEffect(() => {
    if (isOpen) {
      onOpenPasswordRequired();
    } else {
      onClosePasswordRequired();
      onCloseChildren();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isValidElement(children)) {
    return null;
  }

  const handleOnSuccess = () => {
    onClosePasswordRequired();
    onOpenChildren();
  };

  const handleOnError = () => {
    toastError('error');
  };

  return (
    <Box>
      {cloneElement(children as ReactElement, {
        ...(children as ReactElement).props,
        isOpen: isOpenChildren,
        onClose: () => {
          onCloseChildren();
          onClose();
        },
      })}
      <PasswordFormModal
        isOpen={isOpenPasswordRequired}
        onClose={() => {
          onClosePasswordRequired();
          onClose();
        }}
        onSuccess={handleOnSuccess}
        onError={handleOnError}
      />
    </Box>
  );
};

export default UnlockWalletPopupRequired;
