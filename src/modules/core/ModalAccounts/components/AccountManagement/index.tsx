import { Button, Flex, Divider, Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { ListAccounts } from './ListAccounts';
import { ImportIcon, KeyIcon, PlusIcon } from '@/icons';
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
      <Flex mt="4" justifyContent="start" gap="4" direction={'column'}>
        <Button
          variant="ghost"
          w="100%"
          onClick={() => onChangeType(TypesEnum.CREATE_ACCOUNT)}
        >
          <Flex alignItems={'center'} gap="2">
            <Box>
              <PlusIcon />
            </Box>
            <Text>{t('create_account')}</Text>
          </Flex>
        </Button>
        <Button
          variant="ghost"
          w="100%"
          onClick={() => onChangeType(TypesEnum.IMPORT_ACCOUNT)}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'} gap="2">
            <Box>
              <ImportIcon />
            </Box>
            <Text>{t('import_account')}</Text>
          </Flex>
        </Button>
        <Button
          variant="ghost"
          w="100%"
          onClick={() => onChangeType(TypesEnum.VIEW_PRIVATE_KEY)}
        >
          <Flex alignItems={'center'} gap="2">
            <Box>
              <KeyIcon />
            </Box>
            <Text>{t('view_private_key')}</Text>
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};
