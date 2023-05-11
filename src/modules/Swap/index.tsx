import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import SwapForm from './components/SwapForm';

const Swap = () => {
  const { t } = useTranslation();

  return (
    <Flex justifyContent={'center'}>
      <Box w={'lg'}>
        <Box>
          <Text>{t('swap')}</Text>
          <Text>{t('swap_description')}</Text>
        </Box>
        <SwapForm />
      </Box>
    </Flex>
  );
};

export default Swap;
