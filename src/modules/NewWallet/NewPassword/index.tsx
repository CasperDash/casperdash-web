import { Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import NewPasswordForm from '@/modules/core/NewPasswordForm';

const NewWalletPassword = () => {
  const { t } = useTranslation();

  return (
    <Flex
      mt="14"
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <Flex direction="column" alignItems="center">
        <Heading
          variant={{
            base: '2xl',
            md: '5xl',
          }}
          as="h2"
        >
          {t('new_password')}
        </Heading>
        <Text color="gray.500" mt="4">
          {t('new_password_description')}
        </Text>
      </Flex>
      <NewPasswordForm mt="6" w="552px" />
    </Flex>
  );
};

export default NewWalletPassword;
