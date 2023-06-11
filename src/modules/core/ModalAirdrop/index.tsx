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

import AirdropForm from './components/AirdropForm';

type ModalAirdropProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAirdrop = ({ isOpen, onClose }: ModalAirdropProps) => {
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
                🌟 Get Your Airdrop Code on Telegram! 🌟
              </Text>

              <Box mt="6">
                <Text lineHeight="2">
                  To receive your unique Airdrop code, follow these simple
                  steps:
                </Text>
                <Text lineHeight="2">
                  1️⃣ Join our official Telegram group:{' '}
                  <Link
                    href="https://t.me/cd_aidrop_bot"
                    isExternal
                    color="primary"
                  >
                    https://t.me/cd_aidrop_bot
                  </Link>
                </Text>
                <Text lineHeight="2">
                  2️⃣ Enter the code provided on our popup to join the testing
                </Text>
              </Box>
              <Text mt="2">
                🚀 Participate in the Airdrop, earn rewards, and help shape the
                future of CasperDash!
              </Text>
              <Text as="i" mt="4">
                Don&apos;t miss out on the CasperDash Airdrop opportunity. Join
                us on Telegram and grab your exclusive code now!
              </Text>
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
