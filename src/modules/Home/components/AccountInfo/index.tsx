import { CopyIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Flex,
  Text,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';
import { ModalAccounts } from '@/modules/core/ModalAccounts';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

export type AccountInfoProps = BoxProps;

const AccountName = () => {
  const { data: { name } = {} } = useGetCurrentAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        alignItems={'center'}
        cursor="pointer"
        _hover={{
          color: 'secondary',
        }}
        onClick={onOpen}
      >
        <Text fontSize={{ base: 'xl', md: '2xl' }}>{name}</Text>
        <EditIcon ml="2" />
      </Flex>
      <UnlockWalletPopupRequired>
        <ModalAccounts isOpen={isOpen} onClose={onClose} />
      </UnlockWalletPopupRequired>
    </>
  );
};

const AccountInfo = (props: AccountInfoProps) => {
  const { data: { publicKey } = {} } = useGetCurrentAccount();
  const { toastSuccess } = useI18nToast();
  const { onCopy } = useClipboard(publicKey || '');

  if (!publicKey) {
    return null;
  }

  const handleOnCopy = () => {
    onCopy();
    toastSuccess('copy_public_key');
  };

  return (
    <Box
      {...props}
      p="8"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5xl"
      backgroundColor="white"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="4">
        <Box flex={'1 0 100px'}>
          <AccountName />
        </Box>
        <Flex alignItems={'center'}>
          <Text noOfLines={3}>{publicKey}</Text>
          <CopyIcon ml="4" onClick={handleOnCopy} cursor="pointer" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountInfo;
