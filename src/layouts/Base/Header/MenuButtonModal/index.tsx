import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useI18nToast } from '@/hooks/useI18nToast';
import { MenuIcon } from '@/icons';
import { useAppDispatch } from '@/store';
import { reset } from '@/store/wallet';
import { localStorageUtil } from '@/utils/localStorage';

const MenuButtonModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toastSuccess } = useI18nToast();

  const handleDeleteAllData = () => {
    dispatch(reset());
    localStorageUtil.removeAll();
    toastSuccess('delete_all_data_success');
  };

  return (
    <Menu>
      <MenuButton as={Button} variant="circle">
        <MenuIcon />
      </MenuButton>
      <MenuList borderRadius="3xl" p="4">
        <MenuItem p="3" borderRadius="3xl" onClick={handleDeleteAllData}>
          {t('delete_all_data')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuButtonModal;
