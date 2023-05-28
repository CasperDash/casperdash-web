import { useRef } from 'react';

import { LockIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PathEnum } from '@/enums';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateLockWallet } from '@/hooks/mutates/useMutateLockWallet';

const ButtonLockWallet = () => {
  const navigate = useNavigate();
  const { toastSuccess } = useI18nToast();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const cancelRef = useRef(null!);
  const { mutate, isLoading } = useMutateLockWallet({
    onSuccess: () => {
      onClose();
      toastSuccess('your_wallet_locked');
      navigate(PathEnum.HOME);
    },
  });

  const handleOnLockWallet = async () => {
    mutate();
  };

  return (
    <>
      <Button
        leftIcon={<LockIcon />}
        p="6"
        w="100%"
        variant="ghost"
        borderRadius="xl"
        onClick={onOpen}
        justifyContent="flex-start"
      >
        <Text ml="1">{t('lock_wallet')}</Text>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size={{ base: 'xs', md: 'xl' }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('are_you_sure_lock_wallet')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('lock_wallet_description')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button
                colorScheme="red"
                onClick={handleOnLockWallet}
                ml={3}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                {t('lock')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ButtonLockWallet;
