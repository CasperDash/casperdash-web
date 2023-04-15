import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useAccount } from '@/hooks/useAccount';
import { useDeleteAllData } from '@/hooks/useDeleteAllData';
import { MenuIcon } from '@/icons';

const MenuButtonModal = () => {
  const { publicKey, isConnected } = useAccount();
  const deleteAllData = useDeleteAllData();
  const { t } = useTranslation();

  const handleDeleteAllData = () => {
    deleteAllData();
  };

  return (
    <Menu>
      <MenuButton disabled={isConnected} as={Button} variant="circle">
        <MenuIcon />
      </MenuButton>
      {publicKey && (
        <MenuList borderRadius="3xl" p="4">
          <MenuItem p="3" borderRadius="3xl" onClick={handleDeleteAllData}>
            {t('delete_all_data')}
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default MenuButtonModal;
