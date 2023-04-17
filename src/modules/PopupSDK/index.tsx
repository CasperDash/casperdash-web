import { useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Divider,
  useDisclosure,
  ModalHeader,
  Heading,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { RepliedMessageMethodEnums } from '@/enums/postMessageMethod';
import { useAccount } from '@/hooks/useAccount';
import { useAutoSetOriginUrl } from '@/hooks/useAutoSetOriginUrl';
import { useWatchMessageEvent } from '@/hooks/useWatchMessageEvent';
import SDKConnectWallet from '@/modules/PopupSDK/components/ConnectWallet';
import SDKSign from '@/modules/PopupSDK/components/Sign';
import SDKSignMessage from '@/modules/PopupSDK/components/SignMessage';
import {
  normalizeSignDeployParams,
  normalizeSignMessageParams,
} from '@/utils/normalizer';

const PopupSDK = () => {
  const { publicKey } = useAccount();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentMethod, setCurrentMethod] = useState<RepliedMessageMethodEnums>(
    RepliedMessageMethodEnums.CONNECT
  );
  const [currentParams, setCurrentParams] = useState({});
  const [searchParams] = useSearchParams();
  useAutoSetOriginUrl();

  useWatchMessageEvent({
    onHandle: (
      method: RepliedMessageMethodEnums,
      params: Record<string, string | undefined>
    ) => {
      setCurrentMethod(method);
      setCurrentParams(params);
      onOpen();
    },
  });

  useEffect(() => {
    const originUrl = searchParams.get('originUrl');
    if (originUrl && publicKey) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" w={{ base: '340px', md: '400px' }}>
          <ModalHeader>
            <Heading variant="xl" textAlign="center">
              {currentMethod === RepliedMessageMethodEnums.CONNECT
                ? t('connect_with_your_site')
                : t('signature_request')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            {
              {
                [RepliedMessageMethodEnums.CONNECT]: (
                  <SDKConnectWallet onSuccess={() => onClose()} />
                ),
                [RepliedMessageMethodEnums.SIGN]: (
                  <SDKSign
                    params={normalizeSignDeployParams(currentParams)}
                    onApproved={onClose}
                    onRejected={onClose}
                  />
                ),
                [RepliedMessageMethodEnums.SIGN_MESSAGE]: (
                  <SDKSignMessage
                    params={normalizeSignMessageParams(currentParams)}
                    onApproved={onClose}
                    onRejected={onClose}
                  />
                ),
                [RepliedMessageMethodEnums.DISCONNECT]: null,
              }[currentMethod]
            }
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PopupSDK;
