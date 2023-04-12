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
import { useWatchMessageEvent } from '@/hooks/useWatchMessageEvent';
import SDKConnectWallet from '@/modules/SDK/ConnectWallet';
import SDKSign from '@/modules/SDK/Sign';
import { normalizeSignDeployParams } from '@/utils/normalizer';

const ModalSDKAction = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentMethod, setCurrentMethod] = useState<RepliedMessageMethodEnums>(
    RepliedMessageMethodEnums.CONNECT
  );
  const [currentParams, setCurrentParams] = useState({});
  const [searchParams] = useSearchParams();

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
    if (originUrl) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader>
            <Heading variant="xl" textAlign="center">
              {t('sdk')}
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
                    onSuccess={onClose}
                    onReject={onClose}
                  />
                ),
                [RepliedMessageMethodEnums.SIGN_MESSAGE]: null,
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

export default ModalSDKAction;
