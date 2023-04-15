import { Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import DoubleCheck from './DoubleCheck';

const NewWalletDoubleCheck = () => {
  const { t } = useTranslation();

  return (
    <Flex
      mt="14"
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <Flex direction="column" alignItems="center">
        <Heading variant={{ base: '2xl', md: '5xl' }} as="h2">
          {t('double_check')}
        </Heading>
        <Text color="gray.500" mt="4" textAlign="center">
          {t('recovery_phrase_description')}
        </Text>
      </Flex>
      <DoubleCheck mt="6" w="552px" />
    </Flex>
  );
};

export default NewWalletDoubleCheck;
