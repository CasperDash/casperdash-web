import { EmailIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PathEnum } from '@/enums/path';

type ModalConnectProps = {
  isOpen: boolean;
  onClose: () => void;
};
const ModalConnect = ({ isOpen, onClose }: ModalConnectProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnCreateWallet = () => {
    navigate(PathEnum.NEW_WALLET);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>{t('connect_your_wallet')}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="4">
              <Button
                variant="light-outline-icon"
                leftIcon={<EmailIcon />}
                onClick={handleOnCreateWallet}
              >
                {t('create_new_wallet')}
              </Button>
              <Button variant="light-outline-icon" leftIcon={<EmailIcon />}>
                {t('import_phrase')}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalConnect;
