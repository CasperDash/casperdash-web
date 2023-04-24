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
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGetMyRecoveryPhrase } from '@/hooks/queries/useGetMyRecoveryPhrase';

type ModalRecoveryPhraseProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalRecoveryPhrase = ({ isOpen, onClose }: ModalRecoveryPhraseProps) => {
  const { t } = useTranslation();
  const { data: recoveryPhrase } = useGetMyRecoveryPhrase();
  console.log('recoveryPhrase: ', recoveryPhrase);
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
            >
              {t('recovery_phrase')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRecoveryPhrase;
