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
  ModalFooter,
  Divider,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PathEnum } from '@/enums/path';
import { ImportIcon, PlusIcon } from '@/icons';

type ModalConnectProps = {
  isOpen: boolean;
  onClose: () => void;
};
const ModalConnectWallet = ({ isOpen, onClose }: ModalConnectProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnCreateWallet = () => {
    navigate(PathEnum.NEW_WALLET);
    onClose();
  };

  const handleOnImportWallet = () => {
    navigate(PathEnum.IMPORT_WALLET);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius="2xl"
          m={{
            base: '10',
          }}
          w={{ base: 'sm', md: 'xl' }}
        >
          <ModalHeader>
            <Heading
              variant={{
                base: 'sm',
                md: 'xl',
              }}
            >
              {t('connect_your_wallet')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="4" mt="6">
              <Button
                variant="light-outline-icon"
                leftIcon={<PlusIcon />}
                onClick={handleOnCreateWallet}
              >
                {t('create_new_wallet')}
              </Button>
              <Button
                variant="light-outline-icon"
                leftIcon={<ImportIcon />}
                onClick={handleOnImportWallet}
              >
                {t('import_phrase')}
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalConnectWallet;
