import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import SendForm from './components/SendForm';

const Send = () => {
  const location = useLocation();
  console.log(location);
  const { t } = useTranslation();
  return (
    <Flex justifyContent="center" w="100%" mt="20">
      <Box>
        <Flex direction="column" alignItems="center">
          <Heading>{t('send')}</Heading>
          <Text mt="4">{t('send_description')}</Text>
        </Flex>
        <Box
          mt="16"
          px="9"
          py="10"
          border="1px solid"
          borderColor="gray.200"
          w="lg"
          borderRadius="5xl"
        >
          <SendForm />
        </Box>
      </Box>
    </Flex>
  );
};

export default Send;
