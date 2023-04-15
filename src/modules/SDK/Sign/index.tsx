import { useState } from 'react';

import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { JsonTypes } from 'typedjson';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useMutateSignDeploy } from '@/hooks/mutates/useMutateSignDeploy';
import { useRejectSign } from '@/hooks/postMesasges/useRejectSign';
import { useGetParsedDeployData } from '@/hooks/queries/useGetParsedDeployData';
import { useI18nToast } from '@/hooks/useI18nToast';
import PasswordForm from '@/modules/core/UnlockWalletPopupRequired/components/PasswordForm';

type Props = {
  params: {
    deploy: {
      deploy: JsonTypes;
    };
    signingPublicKeyHex: string;
    targetPublicKeyHex: string;
  };
  onApproved?: () => void;
  onRejected?: () => void;
};

type DeployParam = {
  key: string;
  isTruncated?: boolean;
  tKey: string;
};
const DEPLOY_PARAMS: DeployParam[] = [
  {
    key: 'deployHash',
    tKey: 'deploy_hash',
    isTruncated: true,
  },
  {
    key: 'account',
    tKey: 'account',
    isTruncated: true,
  },
  {
    key: 'timestamp',
    tKey: 'timestamp',
  },
  {
    key: 'payment',
    tKey: 'payment',
  },
  {
    key: 'deployType',
    tKey: 'deploy_type',
  },
];

const SDKSign = ({ params, onApproved, onRejected }: Props) => {
  const { toastSuccess } = useI18nToast();
  const [isApproved, setIsApproved] = useState(false);
  const { t } = useTranslation();
  const { data } = useGetParsedDeployData(params);
  const rejectSign = useRejectSign();

  const { mutate, isLoading } = useMutateSignDeploy({
    onSuccess: () => {
      toastSuccess('success');
      onApproved?.();
    },
  });

  const handleOnApprove = async () => {
    setIsApproved(true);
  };

  const handleOnReject = async () => {
    rejectSign();

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
            {DEPLOY_PARAMS.map((deployParam: DeployParam) => {
              const value = _.get(data, deployParam.key, '');
              return (
                <Flex
                  key={deployParam.key}
                  justifyContent="space-between"
                  w="100%"
                >
                  <Text fontWeight="bold">{t(deployParam.tKey)}</Text>
                  {deployParam.isTruncated ? (
                    <MiddleTruncatedText
                      value={value}
                      startLength={8}
                      endLength={8}
                    />
                  ) : (
                    <Text>{value}</Text>
                  )}
                </Flex>
              );
            })}
            {_.get(data, 'deployArgs') && (
              <>
                <Divider className="divider" />
                {Object.keys(_.get(data, 'deployArgs', {})).map(
                  (argKey: string) => {
                    const value = _.get(data, `deployArgs[${argKey}]`, '');

                    return (
                      <Flex
                        justifyContent="space-between"
                        w="100%"
                        key={argKey}
                      >
                        <Text fontWeight="bold">{argKey}</Text>
                        <MiddleTruncatedText
                          value={value}
                          startLength={8}
                          endLength={8}
                        />
                      </Flex>
                    );
                  }
                )}
              </>
            )}
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

export default SDKSign;
