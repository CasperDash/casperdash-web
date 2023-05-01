import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { Flex, Button, useClipboard, Box, Text } from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';

import { useAccount } from '@/hooks/useAccount';

const ReceivingAddressContent = () => {
  const { publicKey = '' } = useAccount();
  const { t } = useTranslation();

  const { onCopy, hasCopied } = useClipboard(publicKey, {
    timeout: 2000,
  });

  const handleOnCopy = () => {
    onCopy();
  };

  return (
    <Box>
      <Box mt={6}>
        <Flex justifyContent={'center'}>
          <QRCodeSVG size={230} value={publicKey} />
        </Flex>
        <Flex justifyContent={'center'} mt="8">
          <Text lineHeight={1.6} color="gray.500">
            {t('your_wallet_address')}
          </Text>
        </Flex>
        <Flex
          bg="gray.100"
          px="8"
          py="2.5"
          mt="2"
          borderRadius="base"
          justifyContent="center"
        >
          <Text noOfLines={2} textAlign="center">
            {publicKey}
          </Text>
        </Flex>
      </Box>
      <Flex justifyContent={'center'} mt="10">
        <Button
          leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
          variant={'outline'}
          onClick={handleOnCopy}
          w="6xs"
        >
          {t('copy_wallet_address')}
        </Button>
      </Flex>
    </Box>
  );
};

export default ReceivingAddressContent;
