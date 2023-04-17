import { useState } from 'react';

import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useMutateSignMessage } from '@/hooks/mutates/useMutateSignMessage';
import { useRejectSignMessage } from '@/hooks/postMesasges/useRejectSignMessage';
import { useI18nToast } from '@/hooks/useI18nToast';
import PasswordForm from '@/modules/core/UnlockWalletPopupRequired/components/PasswordForm';

type Props = {
  params: {
    message: string;
    signingPublicKeyHex: string;
  };
  onApproved?: () => void;
  onRejected?: () => void;
};

const SDKSignMessage = ({ params, onApproved, onRejected }: Props) => {
  const { toastSuccess } = useI18nToast();
  const [isApproved, setIsApproved] = useState(false);
  const { t } = useTranslation();
  const rejectSignMessage = useRejectSignMessage();
  const { mutate, isLoading } = useMutateSignMessage({
    onSuccess: () => {
      toastSuccess('success');
      onApproved?.();
    },
  });

  const handleOnApprove = async () => {
    setIsApproved(true);
  };

  const handleOnReject = async () => {
    rejectSignMessage();

    onRejected?.();
  };

  const handleOnSuccess = () => {
    mutate(params);
  };

  return (
    <>
      {isApproved ? (
        <PasswordForm onSuccess={handleOnSuccess} />
      ) : (
        <Flex
          mt="4"
          direction="column"
          justifyContent={'space-between'}
          w="100%"
          alignItems="center"
        >
          <Flex direction="column" w="90%" gap="4">
            <Flex justifyContent="space-between" w="100%">
              <Text fontWeight="bold">{t('signing_key')}</Text>
              <MiddleTruncatedText
                value={params.signingPublicKeyHex}
                startLength={8}
                endLength={8}
              />
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold">{t('message')}</Text>
              <Textarea mt="2" value={params.message} rows={8} cols={8} />
            </Flex>
          </Flex>
          <Flex mt="10" justifyContent="space-between" gap="5">
            <Button variant="primary" minW="30" onClick={handleOnReject}>
              {t('reject')}
            </Button>
            <Button
              variant="primary"
              onClick={handleOnApprove}
              isLoading={isLoading}
              minW="30"
            >
              {t('approve')}
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default SDKSignMessage;
