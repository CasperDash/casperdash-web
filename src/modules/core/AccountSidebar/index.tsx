import { useDisclosure } from '@chakra-ui/react';
import {
  Text,
  Box,
  Button,
  Divider,
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { PiUserCircleLight } from 'react-icons/pi';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useAccount } from '@/hooks/useAccount';
import { ButtonDeleteAllData } from '@/modules/core/ButtonDeleteAllData';
import ButtonLockWallet from '@/modules/core/ButtonLockWallet';
import ButtonViewRecoveryPhrase from '@/modules/core/ButtonViewRecoveryPhrase';
// import MyAccount from '@/modules/core/MyAccount';

const AccountSidebar = () => {
  const { isConnected, isLocked, publicKey } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button
        background={'panelBackground'}
        shadow="panelShadow"
        onClick={onOpen}
      >
        <Flex justifyContent={'center'} alignItems="center" gap="4">
          <MiddleTruncatedText
            textProps={{ fontWeight: 500 }}
            value={publicKey}
          />
          <PiUserCircleLight size={30} />
        </Flex>
      </Button>
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            background={'panelBackground'}
            // shadow="panelShadow"
            borderBottomWidth="1px"
          >
            <Flex>
              <Box>
                <Text fontSize={'18px'}>Account 1</Text>
                <MiddleTruncatedText
                  textProps={{ fontSize: '12px', fontWeight: 400 }}
                  value={publicKey}
                />
              </Box>
              {/* <IconButton
                isRound={true}
                variant="solid"
                colorScheme="teal"
                aria-label="Done"
                fontSize="20px"
                icon={<CheckIcon />}
              /> */}
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex direction={'column'}>
              {isConnected && (
                <>
                  {!isLocked && (
                    <>
                      <ButtonViewRecoveryPhrase />
                      <ButtonLockWallet />
                    </>
                  )}
                  <Divider mt="3" />
                  <ButtonDeleteAllData />
                </>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AccountSidebar;
