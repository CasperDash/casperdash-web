import { useEffect, useState } from 'react';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useCancelNFTListing } from '../../hooks/useCancelNFTListing';
import { useGetCurrentNFT } from '../../hooks/useGetCurrentNFT';
import EditInputField from '@/components/Common/EditInputField';
import TripleDotLoading from '@/components/Loading/TripleDotLoading';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateEstimateFee } from '@/hooks/mutates/useMutateEstimateFee';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { getColorByStatus } from '@/utils/color';

type Props = {
  contractAddress: string;
  tokenId: string;
  onClose?: () => void;
  onOpenTransaction?: () => void;
};

const ModalContentHandler = ({
  contractAddress,
  tokenId,
  onClose,
  onOpenTransaction,
}: Props) => {
  const { nft } = useGetCurrentNFT();
  const { toastSuccess } = useI18nToast();
  const { t } = useTranslation();
  const [paymentAmount, setPaymentAmount] = useState('0');
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  const {
    mutate,
    isLoading: isCancelListing,
    feeNetwork,
    buildFn,
    isReady,
    isLoadingContract,
  } = useCancelNFTListing(contractAddress, {
    onSuccess: () => {
      toastSuccess('listing_cancelled');
      onClose?.();
      onOpenTransaction?.();
    },
  });
  const {
    mutate: estimateFee,
    isLoading: isEstimating,
    data: estimatedResult,
  } = useMutateEstimateFee({
    onSuccess: (data) => {
      setPaymentAmount(data?.cost || '0');
    },
  });

  const params = {
    tokenId: tokenId,
    contractPackageHash: contractAddress,
  };

  const handleOnConfirm = () => {
    mutate({
      ...params,
      paymentAmount,
    });
  };

  const isDisabled = balance < feeNetwork;

  const handleOnChangePaymentAmount = (value: string) => {
    setPaymentAmount(value);
  };

  useEffect(() => {
    if (isReady) {
      estimateFee(() => {
        return buildFn(params);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return (
    <>
      <Text>{t('cancel_listing_description')}</Text>
      <Box mt="4" borderRadius={'2xl'} p="4">
        <Flex mt="4">
          <Text>{t('name')}</Text>
          <Text ml="auto">{nft?.name}</Text>
        </Flex>
        <Flex mt="8">
          <Text>{t('token_id')}</Text>
          <Text ml="auto">{nft?.tokenId}</Text>
        </Flex>
        <Flex mt="4" justifyContent={'space-between'} alignItems="center">
          <Text>{t('network_gas')}</Text>
          <EditInputField
            value={paymentAmount}
            onChange={handleOnChangePaymentAmount}
            isLoading={isEstimating}
          />
        </Flex>
        <Flex mt="4">
          <Text>{t('estimated_result')}</Text>
          <Text ml="auto" color={getColorByStatus(estimatedResult?.status)}>
            {isEstimating ? (
              <TripleDotLoading />
            ) : (
              estimatedResult?.status || '-'
            )}
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
          isLoading={isCancelListing || isEstimating || isLoadingContract}
          isDisabled={isDisabled}
          loadingText={isEstimating && t('estimating')}
        >
          {isDisabled ? t('insufficient_balance') : t('confirm')}
        </Button>
      </Flex>
    </>
  );
};

export default ModalContentHandler;
