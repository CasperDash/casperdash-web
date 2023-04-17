import { Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useConnectToDapp } from '@/hooks/postMesasges/useConnectToDapp';
import { useAccount } from '@/hooks/useAccount';
import { useI18nToast } from '@/hooks/useI18nToast';

type Props = {
  onSuccess?: () => void;
};

const SDKConnectWallet = ({ onSuccess }: Props) => {
  const { publicKey } = useAccount();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { toastError } = useI18nToast();
  const connect = useConnectToDapp();
  const connectUrl = searchParams.get('originUrl');

  const handleOnConnectUrl = () => {
    if (!publicKey) {
      toastError('public_key_is_not_empty');
      return;
    }
    if (!connectUrl) {
      toastError('connect_url_is_not_empty');
      return;
    }
    connect(connectUrl, publicKey);

    onSuccess?.();
  };

  return (
    <Flex direction="column" justifyContent="space-between" paddingTop="20">
      <Flex direction="column" alignItems="center">
        <Text fontWeight="bold">{connectUrl}</Text>
      </Flex>
      <Flex mt="20" justifyContent="center">
        <Button variant="primary" onClick={handleOnConnectUrl}>
          {t('connect_your_wallet')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default SDKConnectWallet;
