import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { PiUserCircleLight } from 'react-icons/pi';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useAccount } from '@/hooks/useAccount';
import { ButtonDeleteAllData } from '@/modules/core/ButtonDeleteAllData';
import ButtonLockWallet from '@/modules/core/ButtonLockWallet';
import ButtonViewRecoveryPhrase from '@/modules/core/ButtonViewRecoveryPhrase';
import MyAccount from '@/modules/core/MyAccount';

const MenuItemWrapper = ({ children }: { children: React.ReactNode }) => (
  <MenuItem mt="3" p="0" borderRadius="xl">
    {children}
  </MenuItem>
);

const MenuButtonModal = () => {
  const { isConnected, isLocked, publicKey } = useAccount();

  return (
    <Menu>
      <MenuButton
        minW={48}
        isDisabled={!isConnected}
        as={Button}
        h="80%"
        background={'panelBackground'}
        shadow="panelShadow"
      >
        <Flex justifyContent={'center'} alignItems="center" gap="4">
          <MiddleTruncatedText
            textProps={{ fontWeight: 500 }}
            value={publicKey}
          />
          <PiUserCircleLight size={30} />
        </Flex>
      </MenuButton>
      <MenuList borderRadius="xl" p="4">
        {isConnected && (
          <>
            {!isLocked && (
              <>
                <MenuItemWrapper>
                  <MyAccount w="100%" variant="ghost" />
                </MenuItemWrapper>
                <Divider mt="3" />
                <MenuItemWrapper>
                  <ButtonViewRecoveryPhrase />
                </MenuItemWrapper>
                <MenuItemWrapper>
                  <ButtonLockWallet />
                </MenuItemWrapper>
              </>
            )}
            <Divider mt="3" />
            <MenuItemWrapper>
              <ButtonDeleteAllData />
            </MenuItemWrapper>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuButtonModal;
