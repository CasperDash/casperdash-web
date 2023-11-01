import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useCancelNFTListing } from '../../hooks/useCancelNFTListing';
import { useGetPendingActionTransaction } from '../../hooks/useGetPendingActionTransaction';
import { DeployActionsEnum } from '@/enums/deployActions';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { ModalTransactionStatus } from '@/modules/core/ModalTransactionStatus';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

type Props = {
  contractAddress: string;
  tokenId: string;
  onContinue?: () => void;
};

const CancelListButton = ({ contractAddress, tokenId, onContinue }: Props) => {
  const { toastSuccess } = useI18nToast();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isPending, isLoading } = useGetPendingActionTransaction({
    tokenAddress: contractAddress,
    tokenId,
    action: DeployActionsEnum.CANCEL_LIST_ITEM,
  });
  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onClose: onCloseTransaction,
  } = useDisclosure();
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  const {
    mutate,
    isLoading: isCancelListing,
    feeNetwork,
    data,
  } = useCancelNFTListing(contractAddress, {
    onSuccess: () => {
      toastSuccess('listing_cancelled');
      onClose();
      onOpenTransaction();
    },
  });

  const handleOnCancel = () => {
    onOpen();
  };

  const handleOnConfirm = () => {
    mutate({
      tokenId: tokenId,
      contractPackageHash: contractAddress,
    });
  };

  const handleOnContinue = () => {
    onCloseTransaction();
    onContinue?.();
  };

  const isDisabled = balance < feeNetwork;

  return (
    <>
      <Button
        variant="light-outline"
        mt="4"
        w="100%"
        onClick={handleOnCancel}
        fontWeight={'bold'}
        isLoading={isLoading || isPending}
        loadingText={isPending && t('processing')}
      >
        {t('cancel_listing')}
      </Button>
      <UnlockWalletPopupRequired>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent pb="8">
            <ModalHeader>{t('cancel_listing')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{t('cancel_listing_description')}</Text>
              <Box
                mt="4"
                borderRadius={'2xl'}
                border={'1px'}
                borderColor={'gray.200'}
                bgColor={'gray.200'}
                p="4"
              >
                <Flex justifyContent={'space-between'} alignItems="center">
                  <Text>{t('fee')}</Text>
                  <Text>
                    {t('intlAssetNumber', {
                      asset: 'CSPR',
                      val: feeNetwork | 0,
                    })}
                  </Text>
                </Flex>
              </Box>
              <Flex mt="8">
                <Button
                  variant="primary"
                  mr={3}
                  type="submit"
                  w="100%"
                  onClick={handleOnConfirm}
                  isLoading={isCancelListing}
                  isDisabled={isDisabled}
                >
                  {isDisabled ? t('insufficient_balance') : t('confirm')}
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </UnlockWalletPopupRequired>
      <ModalTransactionStatus
        transactionHash={data?.deployHash}
        isOpen={isOpenTransaction}
        onClose={handleOnContinue}
      />
    </>
  );
};

export default CancelListButton;
