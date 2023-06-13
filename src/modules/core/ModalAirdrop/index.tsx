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
                🌟 CasperDash Retroactive Program 🌟
              </Text>

              <Box mt="6">
                <Text lineHeight="2">
                  You need to claim the unique Code to join the Retroactive
                  program. Please follow these simple steps:
                </Text>
                <Text lineHeight="2">
                  1️⃣ Join our official CasperDash Retroactive Bot:{' '}
                  <Link
                    href="https://t.me/cd_aidrop_bot"
                    isExternal
                    color="primary"
                  >
                    https://t.me/cd_aidrop_bot
                  </Link>
                </Text>
                <Text lineHeight="2">
                  2️⃣ Enter the code provided by CasperDash Retroactive Bot to
                  join the testing
                </Text>
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
