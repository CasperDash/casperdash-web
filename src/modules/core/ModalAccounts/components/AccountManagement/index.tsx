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
      <Flex
        mt="4"
        justifyContent={'center'}
        gap="4"
        direction={'column'}
        alignItems={'center'}
      >
        <Button
          variant="ghost"
          w="150px"
          onClick={() => onChangeType(TypesEnum.CREATE_ACCOUNT)}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'} w="100%">
            <Box>
              <PlusIcon />
            </Box>
            <Text>{t('create_account')}</Text>
          </Flex>
        </Button>
        <Button
          variant="ghost"
          w="150px"
          onClick={() => onChangeType(TypesEnum.IMPORT_ACCOUNT)}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'} w="100%">
            <Box>
              <ImportIcon />
            </Box>
            <Text>{t('import_account')}</Text>
          </Flex>
        </Button>
        <Button
          variant="ghost"
          w="160px"
          onClick={() => onChangeType(TypesEnum.VIEW_PRIVATE_KEY)}
          ml="3"
        >
          <Flex justifyContent={'space-between'} alignItems={'center'} w="100%">
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
