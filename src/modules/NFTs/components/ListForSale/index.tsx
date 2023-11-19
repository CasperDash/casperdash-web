import { useEffect, useState } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Modal,
  useDisclosure,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { SubmitValues, validationSchema } from './formAttributes';
import ModalContentHandler from './ModalContentHandler';
import ModalReview from './ModalReview';
import { useGetPendingActionTransaction } from '../../hooks/useGetPendingActionTransaction';
import { DeployActionsEnum } from '@/enums/deployActions';
import { MarketTokenTypesEnum } from '@/enums/marketTokeTypes';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { ModalTransactionStatus } from '@/modules/core/ModalTransactionStatus';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

type Props = {
  isLoading?: boolean;
  onContinue?: () => void;
  tokenType: MarketTokenTypesEnum;
};

const ListForSale = ({ isLoading, onContinue, tokenType }: Props) => {
  const { contractAddress, tokenId } = useParams();
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const { toastSuccess } = useI18nToast();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onClose: onCloseTransaction,
  } = useDisclosure();

  const {
    isPending,
    isLoading: isLoadingTransactions,
    transaction,
  } = useGetPendingActionTransaction({
    tokenAddress: contractAddress,
    tokenId: tokenId,
    action: DeployActionsEnum.LIST_ITEM,
  });

  const methods = useForm<SubmitValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      paymentAmount: '0',
      price: 0,
      tokenType,
    },
  });

  const handleOnContinue = () => {
    onCloseTransaction();
    onContinue?.();
  };

  const handleCloseModal = () => {
    onClose();
    setIsShowConfirm(false);
  };

  useEffect(() => {
    methods?.setValue('tokenType', tokenType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenType]);

  return (
    <>
      <Button
        mt="4"
        w="100%"
        onClick={onOpen}
        fontWeight={'bold'}
        isLoading={isLoading || isPending || isLoadingTransactions}
        loadingText={isPending && t('deploying')}
      >
        {t('list_for_sale')}
      </Button>

      <UnlockWalletPopupRequired>
        <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
          <ModalOverlay />
          <ModalContent pb="8">
            <ModalHeader textAlign={'center'} position="relative">
              {isShowConfirm && (
                <>
                  <Box position={'absolute'}>
                    <ArrowBackIcon
                      cursor={'pointer'}
                      onClick={() => setIsShowConfirm(false)}
                    />
                  </Box>
                  {t('confirm_listing')}
                </>
              )}
              {!isShowConfirm && t('create_listing')}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormProvider {...methods}>
                {isShowConfirm ? (
                  <ModalReview
                    onSuccess={() => {
                      toastSuccess('listing_created_submitted');
                      onOpenTransaction();
                      handleCloseModal();
                    }}
                  />
                ) : (
                  <ModalContentHandler onList={() => setIsShowConfirm(true)} />
                )}
              </FormProvider>
            </ModalBody>
          </ModalContent>
        </Modal>
      </UnlockWalletPopupRequired>
      <ModalTransactionStatus
        transactionHash={transaction?.deployHash}
        isOpen={isOpenTransaction}
        onClose={handleOnContinue}
      />
    </>
  );
};

export default ListForSale;
