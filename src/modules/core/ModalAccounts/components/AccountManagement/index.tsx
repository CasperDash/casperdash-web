import { Button, Flex, Divider, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { ListAccounts } from './ListAccounts';
import { ImportIcon, PlusIcon } from '@/icons';
import { TypesEnum } from '@/modules/core/ModalAccounts/enum';

type AccountManagementProps = {
  onClose: () => void;
  onChangeType: (type: TypesEnum) => void;
};

export const AccountManagement = ({
  onClose,
  onChangeType,
}: AccountManagementProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <ListAccounts onSelectedAccount={onClose} />
      <Divider mt="4" />
      <Flex
        mt="4"
        justifyContent={'center'}
        gap="4"
        direction={'column'}
        alignItems={'center'}
      >
        <Button
          variant=""
          leftIcon={<PlusIcon />}
          w="fit-content"
          onClick={() => onChangeType(TypesEnum.CREATE_ACCOUNT)}
        >
          {t('create_account')}
        </Button>
        <Button
          variant=""
          leftIcon={<ImportIcon />}
          w="fit-content"
          onClick={() => onChangeType(TypesEnum.IMPORT_ACCOUNT)}
        >
          {t('import_account')}
        </Button>
      </Flex>
    </Box>
  );
};
