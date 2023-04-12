import { Button, Flex } from '@chakra-ui/react';
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
    const connectUrl = searchParams.get('originUrl');
    if (!connectUrl) {
      toastError('connect_url_is_not_empty');
      return;
    }

    mutate({ url: connectUrl });
  };

  return (
    <Flex justifyContent="center" paddingTop="8">
      <Button variant="primary" onClick={handleOnConnectUrl}>
        {t('connect_your_wallet')}
      </Button>
    </Flex>
  );
};

export default SDKConnectWallet;
