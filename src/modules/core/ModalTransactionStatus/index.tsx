import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { useGetDeployStatus } from '@/hooks/queries/useGetDeployStatus';
import { getDeployHashUrl } from '@/utils/url';

type Props = {
  transactionHash?: string;
  isOpen: boolean;
  onClose: () => void;
};

export const ModalTransactionStatus = ({
  isOpen,
  onClose,
  transactionHash,
}: Props) => {
  const { t } = useTranslation();
  const { data = { status: TransactionStatusEnum.PENDING } } =
    useGetDeployStatus({
      transactionHash,
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent pb="8">
        <ModalBody paddingTop="14">
          <Text fontWeight={'bold'} textAlign="center" fontSize={'2xl'}>
            {t('transaction_sent')}
          </Text>
          <Text mt="2" textAlign={'center'}>
            {t('transaction_sent_description')}
          </Text>

          <Stack
            mt="6"
            borderRadius={'2xl'}
            border={'1px'}
            borderColor={'gray.200'}
            bgColor={'gray.200'}
            p="4"
          >
            <Flex justifyContent="space-between">
              <Text>{t('transaction_hash')}</Text>
              <Link
                href={transactionHash && getDeployHashUrl(transactionHash)}
                maxW="40"
                target={'_blank'}
              >
                <MiddleTruncatedText value={transactionHash} />
              </Link>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>{t('status')}</Text>
              <Flex alignItems={'center'}>
                {data.status === TransactionStatusEnum.PENDING && (
                  <>
                    <Spinner size="sm" mr="2" />
                    <Text textTransform={'capitalize'}>{data.status}</Text>
                  </>
                )}
                {data.status === TransactionStatusEnum.COMPLETED && (
                  <Text textTransform={'capitalize'} color="green">
                    {data.status}
                  </Text>
                )}
                {data.status === TransactionStatusEnum.FAILED && (
                  <Text textTransform={'capitalize'} color="red">
                    {data.status}
                  </Text>
                )}
              </Flex>
            </Flex>
          </Stack>
          <Flex mt="8">
            <Button
              variant="primary"
              mr={3}
              type="submit"
              w="100%"
              onClick={onClose}
            >
              {t('continue')}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
