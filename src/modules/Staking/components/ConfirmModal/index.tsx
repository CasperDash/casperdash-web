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
  Button,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { ConfirmModalProps } from './type';
import ValidatorItem from '../ValidatorItem';
import { WalletContained } from '@/icons/wallet-contained';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  values,
  action,
  isLoading,
}: ConfirmModalProps) => {
  const { t } = useTranslation();

  const handleOnSubmit = () => {
    onConfirm?.();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" w={{ base: '3xl', md: 'xl' }}>
          <ModalHeader>
            <Heading variant="xl" textAlign={'center'}>
              {t('confirm')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center" mt="8">
              <WalletContained />
            </Flex>
            <Flex justifyContent="space-between" direction={'column'}>
              <Flex
                borderRadius="xl"
                mt="8"
                bg="gray.100"
                px="8"
                py="5"
                flexDirection={'column'}
              >
                <Flex justifyContent={'space-between'}>
                  <Text fontWeight={'medium'}>
                    {action === 'stake'
                      ? t('you_are_staking')
                      : t('you_are_unstaking')}
                  </Text>
                  <Box>
                    <Text fontWeight={'medium'}>
                      {t('intlAssetNumber', {
                        asset: 'CSPR',
                        val: values.amount,
                      })}
                    </Text>
                  </Box>
                </Flex>
                <ValidatorItem mt="8" {...values.validator} />
              </Flex>

              <Divider mt="9" />

              <Flex justifyContent={'space-between'} mt="8" px="8">
                <Text>{t('network_fee')}:</Text>
                <Text>
                  {t('intlAssetNumber', {
                    asset: 'CSPR',
                    val: 2.5,
                  })}
                </Text>
              </Flex>
              <Flex justifyContent={'center'} mt="8">
                <Button
                  w={'100%'}
                  variant={'primary'}
                  onClick={handleOnSubmit}
                  isLoading={isLoading}
                >
                  Confirm
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
