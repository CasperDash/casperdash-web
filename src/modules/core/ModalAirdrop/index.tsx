import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
  Box,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import AirdropForm from './components/AirdropForm';

type ModalAirdropProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAirdrop = ({ isOpen, onClose }: ModalAirdropProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay pointerEvents="none" />
        <ModalContent
          borderRadius="2xl"
          m={{
            base: '10',
          }}
          w={'xxl'}
        >
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Flex direction={'column'}>
              <Text textAlign={'center'} fontWeight="bold" fontSize={'xl'}>
                {t('airdrop_title')}
              </Text>

              <Box mt="6">
                <Text lineHeight="2">{t('airdrop_description_1')}</Text>
                <Text lineHeight="2">
                  {t('airdrop_description_2')}{' '}
                  <Link
                    href="https://t.me/cd_aidrop_bot"
                    isExternal
                    color="primary"
                  >
                    https://t.me/cd_aidrop_bot
                  </Link>
                </Text>
                <Text lineHeight="2">{t('airdrop_description_3')}</Text>
              </Box>
            </Flex>
            <AirdropForm onSuccess={onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAirdrop;
