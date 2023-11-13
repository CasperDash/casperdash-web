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

import MyAccount from '../MyAccount';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { Config } from '@/config';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';
import { useAccount } from '@/hooks/useAccount';
import { ButtonDeleteAllData } from '@/modules/core/ButtonDeleteAllData';
import ButtonLockWallet from '@/modules/core/ButtonLockWallet';
import ButtonViewRecoveryPhrase from '@/modules/core/ButtonViewRecoveryPhrase';

const AccountSidebar = () => {
  const { isConnected, isLocked, publicKey } = useAccount();
  const { data: { name } = {} } = useGetCurrentAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button
        background={'panelBackground'}
        shadow="panelShadow"
        onClick={onOpen}
      >
        <Flex justifyContent={'center'} alignItems="center" gap="4">
          <Text>{name}</Text>
          <PiUserCircleLight size={30} />
        </Flex>
      </Button>
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader background={'panelBackground'} borderBottomWidth="1px">
            <Flex justifyContent={'space-between'}>
              <Box>
                <Text fontSize={'18px'}>{name}</Text>
                <MiddleTruncatedText
                  textProps={{ fontSize: '12px', fontWeight: 400 }}
                  value={publicKey}
                  isCopy
                />
              </Box>
              <MyAccount isButton />
            </Flex>
          </DrawerHeader>
          <DrawerBody pt={4} pb={4}>
            <Flex rowGap={2} direction={'column'} height="full">
              {isConnected && !isLocked && (
                <>
                  <ButtonViewRecoveryPhrase />
                  <ButtonLockWallet />
                </>
              )}
              <Box mt="auto">
                <Divider mt="3" />
                <ButtonDeleteAllData />
                <Flex justifyContent={'center'} py={2}>
                  <Text fontSize={'sm'} bottom="4" left="8" color="gray.500">
                    Version {Config.appVersion}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AccountSidebar;
