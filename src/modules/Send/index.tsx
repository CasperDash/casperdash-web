import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import SendForm from './components/SendForm';
import TableTransaction from '../core/TableTransaction';

const Send = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Flex justifyContent="center" w="100%" mt={{ base: 10, md: 20 }}>
        <Box>
          <Flex direction="column" alignItems="center">
            <Heading>{t('send')}</Heading>
            <Text mt="4">{t('send_description')}</Text>
          </Flex>
          <Box
            mt={{ base: 4, md: 16 }}
            px="9"
            py="10"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="5xl"
            w={{ base: 'sm', md: 'lg' }}
            mb="0"
          >
            <SendForm />
          </Box>
        </Box>
      </Flex>
      <Divider mt="10" />
      <Box mt="2" p="6">
        <Heading variant="xl">{t('transaction_histories')}</Heading>
        <TableTransaction mt="4" />
      </Box>
    </Box>
  );
};

export default Send;
