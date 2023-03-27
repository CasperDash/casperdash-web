import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  ModalFooter,
  Divider,
  Text,
  Flex,
  Box,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { ReviewModalProps } from './type';
import { WalletContained } from '@/icons/wallet-contained';

const ReviewModal = ({
  isOpen,
  onClose,
  onSend,
  values = {},
  isLoading = false,
}: ReviewModalProps) => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    onSend?.(values);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader>
            <Heading variant="xl">{t('review')}</Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center" mt="8">
              <WalletContained />
            </Flex>
            <Flex
              mt="8"
              bg="gray.100"
              px="8"
              py="5"
              borderRadius="base"
              justifyContent="space-between"
            >
              <Box>
                <Text>{t('transfer_amount')}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">
                  {t('intlAssetNumber', {
                    val: values.transferAmount,
                    asset: values.asset,
                    minimumFractionDigits: 3,
                  })}
                </Text>
                <Text>
                  {t('intlNumber', {
                    val: 300,
                    minimumFractionDigits: 3,
                  })}
                </Text>
              </Box>
            </Flex>
            <Flex direction="column" alignItems="center" mt="8">
              <Text>{t('receiving_address')}</Text>
              <Text textAlign="center" mt="3">
                {t('receiving_address_note')}
              </Text>
            </Flex>
            <Flex
              mt="8"
              bg="gray.100"
              px="8"
              py="2.5"
              borderRadius="base"
              justifyContent="center"
            >
              <Text>{values.receivingAddress}</Text>
            </Flex>
            <Flex direction="column" alignItems="center" mt="8">
              <Text>{t('transfer_id')}</Text>
              <Text mt="3.5">{values.transferId}</Text>
            </Flex>
            <Flex direction="column" alignItems="center" mt="8">
              <Text>{t('network_fee')}</Text>
              <Text mt="3.5">
                {t('intlAssetNumber', {
                  val: 0.1,
                  asset: 'CSPR',
                  minimumFractionDigits: 0,
                })}
              </Text>
            </Flex>
            <Flex justifyContent="center" mt="8">
              <Button
                isLoading={isLoading}
                w="90%"
                variant="primary"
                onClick={handleOnClick}
              >
                {t('send')}
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
