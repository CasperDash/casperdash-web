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
  Image,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ThanksGif from '@/assets/gif/thanks.gif';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const ModalThanksFeedback = ({ isOpen, onClose, onSuccess }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" autoFocus={false}>
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
          <Flex justifyContent={'center'}>
            <Image src={ThanksGif} width="40" />
          </Flex>
          <Flex justifyContent="center" mt="10">
            <Text textAlign={'center'} maxW="96">
              {t('airdrop_successfully_submitted')}
            </Text>
          </Flex>
          <Flex justifyContent={'center'} mt="8">
            <Button variant={'outline'} w="40" onClick={onSuccess}>
              {t('close')}
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalThanksFeedback;
