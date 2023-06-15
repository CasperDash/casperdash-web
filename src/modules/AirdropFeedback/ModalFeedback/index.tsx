import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import FeedbackForm from './components/FeedbackForm';

type ModalAirdropProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalFeedback = ({ isOpen, onClose }: ModalAirdropProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay pointerEvents="none" />
      <ModalContent
        borderRadius="2xl"
        m={{
          base: '10',
        }}
        w={'xl'}
      >
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={'column'}>
            <Text textAlign={'center'} fontWeight="bold" fontSize={'xl'}>
              {t('feedback_title')}
            </Text>
          </Flex>
          <FeedbackForm onSuccess={onClose} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalFeedback;
