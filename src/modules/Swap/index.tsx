import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import SwapForm from './components/SwapForm';

const Swap = () => {
  const { t } = useTranslation();

  return (
    <Flex justifyContent={'center'} mt={{ base: 10, md: 20 }}>
      <Box w={'lg'}>
        <Flex alignItems={'center'} direction="column">
          <Heading>{t('swap')}</Heading>
          <Text mt="4">{t('swap_description')}</Text>
        </Flex>
        <SwapForm />
      </Box>
    </Flex>
  );
};

export default Swap;
