import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  ModalFooter,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import PasswordForm from '@/modules/core/PasswordForm';

type ModalConnectProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};
const PasswordFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
}: ModalConnectProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" w={{ base: 'sm', md: 'xl' }}>
          <ModalHeader>
            <Heading textAlign="center" variant="xl">
              {t('password_required')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign="center" fontSize={'md'}>
              {t('welcome_back_description')}
            </Text>
            <PasswordForm onSuccess={onSuccess} onError={onError} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordFormModal;
