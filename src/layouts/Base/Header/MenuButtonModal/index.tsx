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
import MyAccount from '@/modules/core/MyAccount';

const MenuButtonModal = () => {
  const { isConnected } = useAccount();
  const { publicKey } = useAccount();

  return (
    <Menu>
      <MenuButton isDisabled={!isConnected} as={Button} variant="circle">
        <MenuIcon />
      </MenuButton>
      <MenuList borderRadius="xl" p="4">
        {isConnected && (
          <>
            <MenuItem mt="3" p="0" borderRadius="xl">
              <MyAccount w="100%" variant="ghost" publicKey={publicKey} />
            </MenuItem>
            <Divider mt="3" />
            <MenuItem mt="3" p="0" borderRadius="xl">
              <ButtonDeleteAllData />
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuButtonModal;
