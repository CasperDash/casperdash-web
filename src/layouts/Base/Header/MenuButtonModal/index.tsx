import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { useAccount } from '@/hooks/useAccount';
import { MenuIcon } from '@/icons';
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
  const { isConnected, isLocked } = useAccount();

  return (
    <Menu>
      <MenuButton isDisabled={!isConnected} as={Button} variant="circle">
        <MenuIcon />
      </MenuButton>
      <MenuList borderRadius="xl" p="4">
        {isConnected && (
          <>
            <MenuItemWrapper>
              <MyAccount w="100%" variant="ghost" />
            </MenuItemWrapper>
            <Divider mt="3" />
            {!isLocked && (
              <>
                <MenuItemWrapper>
                  <ButtonViewRecoveryPhrase />
                </MenuItemWrapper>
                <MenuItemWrapper>
                  <ButtonLockWallet />
                </MenuItemWrapper>
              </>
            )}
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
