import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as _ from 'lodash-es';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import ReceiveWidget from './ReceiveWidget';
import { useCreateNFTListing } from '../../hooks/useCreateNFTListing';
import { useGetCurrentNFT } from '../../hooks/useGetCurrentNFT';
import { useGetPendingActionTransaction } from '../../hooks/useGetPendingActionTransaction';
import InputNumber from '@/components/Inputs/InputNumber';
import { DeployActionsEnum } from '@/enums/deployActions';
import { MarketTokenTypesEnum } from '@/enums/marketTokeTypes';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import i18n from '@/i18n';
import { ModalTransactionStatus } from '@/modules/core/ModalTransactionStatus';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

const validationSchema = z.object({
  price: z.number().gt(0, i18n.t('price_must_be_greater_than_0') as string),
});

type SubmitValues = z.infer<typeof validationSchema>;

type Props = {
  isLoading?: boolean;
  onContinue?: () => void;
  tokenType?: MarketTokenTypesEnum;
};

const ListForSaleModal = ({ isLoading, onContinue, tokenType }: Props) => {
  const { contractAddress, tokenId } = useParams();
  const { t } = useTranslation();
  const { toastSuccess } = useI18nToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onClose: onCloseTransaction,
  } = useDisclosure();
  const methods = useForm<SubmitValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      price: 0,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const { nft } = useGetCurrentNFT();
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();
  const { isPending, isLoading: isLoadingTransactions } =
    useGetPendingActionTransaction({
      tokenAddress: contractAddress,
      tokenId: tokenId,
      action: DeployActionsEnum.LIST_ITEM,
    });

  const {
    mutate,
    isLoading: isLisiting,
    feeNetwork,
    data,
  } = useCreateNFTListing(nft?.contractAddress, {
    onSuccess: () => {
      toastSuccess('listing_created_submitted');
      onClose();
      onOpenTransaction();
    },
  });

  const onSubmit = (values: SubmitValues) => {
    if (!nft) {
      return;
    }

    mutate({
      tokenId: nft.tokenId,
      amount: values.price,
      tokenType: tokenType,
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent pb="8">
            <ModalHeader>{t('create_listing')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{t('list_for_sale_description')}</Text>
              <Box mt="8">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.price} mt="4">
                      <FormLabel>
                        <Text fontWeight="bold" mb="4">
                          {t('price')} (CSPR)
                        </Text>
                      </FormLabel>
                      <InputNumber
                        {...register('price', { valueAsNumber: true })}
                        mt="2"
                      />
                      {!!errors.price && (
                        <FormErrorMessage>
                          {_.get(
                            errors,
                            'price.message',
                            t('default_error_message')
                          )}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <ReceiveWidget />
                    <Flex mt="4">
                      <Text mt="4">{t('fee')}</Text>
                      <Text mt="4" ml="auto">
                        {t('intlAssetNumber', {
                          asset: 'CSPR',
                          val: feeNetwork | 0,
                        })}
                      </Text>
                    </Flex>
                    <Flex mt="8">
                      <Button
                        variant="primary"
                        mr={3}
                        type="submit"
                        w="100%"
                        isLoading={isLisiting}
                        isDisabled={isDisabled}
                      >
                        {isDisabled ? t('insufficient_balance') : t('confirm')}
                      </Button>
                    </Flex>
                  </form>
                </FormProvider>
              </Box>
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

export default ListForSaleModal;
