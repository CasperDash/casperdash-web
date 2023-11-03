import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  ModalFooter,
  Divider,
  ModalContent,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import RecoveryPhrasesContent from './ReceivingAddressContent';

type ModalReceivingAddressProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalReceivingAddress = ({
  isOpen,
  onClose,
}: ModalReceivingAddressProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" m={10} w={{ base: 'sm', md: 'xl' }}>
          <ModalHeader>
            <Heading
              variant={{
                base: 'sm',
                md: 'xl',
              }}
              textAlign={'center'}
            >
              {t('receiving_address')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <RecoveryPhrasesContent />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalReceivingAddress;
