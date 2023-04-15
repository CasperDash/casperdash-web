import { Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import SeedPhrases from './components/SeedPhrases';

const ImportPhrase = () => {
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
          {t('import_phrase')}
        </Heading>
        <Text color="gray.500" mt="4">
          {t('import_phrase_description')}
        </Text>
      </Flex>
      <SeedPhrases mt="6" w={{ base: '320px', md: '552px' }} />
    </Flex>
  );
};

export default ImportPhrase;
