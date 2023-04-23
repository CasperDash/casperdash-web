import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useMutateSelectAccount } from '@/hooks/mutates/useMutateSelectAccount';
import { useGetAccounts } from '@/hooks/queries/useGetAccounts';
import { useAccount } from '@/hooks/useAccount';
import { useI18nToast } from '@/hooks/useI18nToast';
import { WalletAccount } from '@/typings/walletAccount';

type ListAccountsProps = {
  onSelectedAccount?: (account: WalletAccount) => void;
};

export const ListAccounts = ({ onSelectedAccount }: ListAccountsProps) => {
  const { t } = useTranslation();
  const { toastSuccess } = useI18nToast();
  const { data: accounts, isLoading } = useGetAccounts();
  const { mutate } = useMutateSelectAccount({
    onSuccess: (selectedAccount) => {
      onSelectedAccount?.(selectedAccount);
      toastSuccess('account_selected', { name: selectedAccount.name });
    },
  });
  const { publicKey: activePublicKey } = useAccount();

  const handleOnSelectAccount = (account: WalletAccount) => {
    mutate({ account });
  };

  return (
    <Flex
      direction="column"
      maxH={{ base: 'xs', md: 'sm' }}
      overflowY={'auto'}
      gap="5"
      alignItems="center"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {accounts?.map((account) => (
            <Button
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.300"
              backgroundColor={
                activePublicKey === account.publicKey ? 'blue.50' : 'white'
              }
              key={account.publicKey}
              variant="ghost"
              p="9"
              _hover={{ bg: 'blue.50' }}
              w="90%"
              onClick={() => handleOnSelectAccount(account)}
            >
              <Flex
                w="100%"
                justifyContent="space-between"
                key={account.publicKey}
                borderRadius="md"
                alignItems="center"
              >
                <Flex direction="column" alignItems="start">
                  <Text>{account.name}</Text>
                  <Text mt="1" fontSize="sm" color="gray.700">
                    {t('intlAssetNumber', {
                      asset: 'CSPR',
                      val: account?.balance || 0,
                    })}
                  </Text>
                </Flex>
                <Text>
                  <MiddleTruncatedText value={account.publicKey} />
                </Text>
              </Flex>
            </Button>
          ))}
        </>
      )}
    </Flex>
  );
};
