import { Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import RecoveryKeys from './components/RecoveryKeys';

const NewWallet = () => {
  const { t } = useTranslation();

  return (
    <Flex
      mt="14"
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <Flex direction="column" alignItems="center">
        <Heading variant="5xl" as="h2">
          {t('recovery_phrase')}
        </Heading>
        <Text color="gray.500" mt="4">
          {t('recovery_phrase_description')}
        </Text>
      </Flex>
      <RecoveryKeys mt="6" w="552px" />
    </Flex>
  );
};

export default NewWallet;
