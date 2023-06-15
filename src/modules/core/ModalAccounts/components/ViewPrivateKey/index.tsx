import {
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Alert,
  AlertDescription,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useSafeClipboard } from '@/hooks/helpers/useSafeClipboard';
import { useGetPrivateKey } from '@/hooks/queries/useGetPrivateKey';
import { useAccount } from '@/hooks/useAccount';

export const ViewPrivateKey = () => {
  const { t } = useTranslation();
  const { uid } = useAccount();
  const { toastSuccess } = useI18nToast();
  const { data: privateKey = '' } = useGetPrivateKey({
    uid,
  });
  const { onCopy } = useSafeClipboard(privateKey);

  const handleOnCopy = () => {
    onCopy();
    toastSuccess('copy_private_key');
  };

  return (
    <Flex direction="column">
      <FormControl>
        <FormLabel>{t('this_is_your_private_key')}</FormLabel>
        <Textarea
          value={privateKey}
          mt="4"
          rows={6}
          readOnly
          onClick={handleOnCopy}
        />
      </FormControl>
      <Alert
        mt="6"
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderRadius={'md'}
      >
        <AlertDescription maxWidth="sm">
          <Text fontSize={'sm'}>{t('warning_private_key_message')}</Text>
        </AlertDescription>
      </Alert>
    </Flex>
  );
};
