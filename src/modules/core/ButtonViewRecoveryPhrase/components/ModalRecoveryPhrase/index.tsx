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

import RecoveryPhrasesContent from './RecoveryPhrasesContent';

type ModalRecoveryPhraseProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalRecoveryPhrase = ({ isOpen, onClose }: ModalRecoveryPhraseProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius="2xl"
          m={{
            base: '10',
          }}
        >
          <ModalHeader>
            <Heading
              variant={{
                base: 'sm',
                md: 'xl',
              }}
              textAlign={'center'}
            >
              {t('recovery_phrase')}
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

export default ModalRecoveryPhrase;
