import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import PasswordForm from '../core/PasswordForm';
import Paper from '@/components/Paper';

const UnlockWallet = () => {
  const { t } = useTranslation();

  return (
    <Flex justifyContent={'center'} mt={{ base: 10, md: 20 }}>
      <Paper w="xl">
        <Flex justifyContent={'center'}>
          <Heading
            variant={{
              base: 'sm',
              md: 'xl',
            }}
          >
            {t('unlock_your_wallet')}
          </Heading>
        </Flex>
        <PasswordForm />
      </Paper>
    </Flex>
  );
};

export default UnlockWallet;
