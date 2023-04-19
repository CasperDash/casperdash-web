import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { useAccount } from '@/hooks/useAccount';
import { MenuIcon } from '@/icons';
import { ButtonDeleteAllData } from '@/modules/core/ButtonDeleteAllData';

const MenuButtonModal = () => {
  const { publicKey, isConnected } = useAccount();

  return (
    <Menu>
      <MenuButton disabled={isConnected} as={Button} variant="circle">
        <MenuIcon />
      </MenuButton>
      {publicKey && (
        <MenuList borderRadius="xl" p="4">
          <MenuItem p="0" borderRadius="xl">
            <ButtonDeleteAllData />
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default MenuButtonModal;
