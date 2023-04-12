import { Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useMutateSDKConnectUrl } from '@/hooks/mutates/useMutateSDKConnectUrl';
import { useI18nToast } from '@/hooks/useI18nToast';

type Props = {
  onSuccess?: () => void;
};

const SDKConnectWallet = ({ onSuccess }: Props) => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { toastError, toastSuccess } = useI18nToast();

  const connectUrl = searchParams.get('originUrl');

  const { mutate } = useMutateSDKConnectUrl({
    onSuccess: () => {
      toastSuccess('succes');
      onSuccess?.();
    },
    onError: (err: Error) => {
      toastError(err.message);
    },
  });

  const handleOnConnectUrl = () => {
    if (!connectUrl) {
      toastError('connect_url_is_not_empty');
      return;
    }

    mutate({ url: connectUrl });
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
