import { useEffect } from 'react';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubmitValues } from './formAttributes';
import ReceiveWidget from './ReceiveWidget';
import { useCreateNFTListing } from '../../hooks/useCreateNFTListing';
import { useGetCurrentNFT } from '../../hooks/useGetCurrentNFT';
import EditInputField from '@/components/Common/EditInputField';
import TripleDotLoading from '@/components/Loading/TripleDotLoading';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateEstimateFee } from '@/hooks/mutates/useMutateEstimateFee';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { getColorByStatus } from '@/utils/color';

type Props = {
  onSuccess: () => void;
};

const ModalReview = ({ onSuccess }: Props) => {
  const methods = useFormContext<SubmitValues>();
  const { toastError } = useI18nToast();
  const { nft } = useGetCurrentNFT();
  const { t } = useTranslation();
  const priceWatched = useWatch({
    control: methods.control,
    name: 'price',
  });
  const tokenTypeWatched = useWatch({
    control: methods.control,
    name: 'tokenType',
  });
  const paymentAmountWatched = useWatch({
    control: methods.control,
    name: 'paymentAmount',
  });
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  const {
    mutate,
    feeNetwork,
    buildFn,
    isReady,
    isLoading: isListing,
  } = useCreateNFTListing(nft?.contractAddress, {
    onSuccess,
  });
  const {
    mutate: estimateFee,
    data: estimatedResult,
    isLoading: isEstimating,
  } = useMutateEstimateFee({
    onSuccess: (data) => {
      methods.setValue('paymentAmount', data?.cost || '0');
    },
  });

  const handleOnFeeChange = (value: string) => {
    methods.setValue('paymentAmount', value);
  };

  const onSubmit = (values: SubmitValues) => {
    if (!nft) {
      toastError('nft_not_found');
      return;
    }

    mutate({
      tokenId: nft.tokenId,
      amount: values.price,
      tokenType: values.tokenType,
      paymentAmount: values.paymentAmount,
    });
  };

  const isDisabled = balance < feeNetwork;

  useEffect(() => {
    if (nft && isReady) {
      estimateFee(async () => {
        return buildFn({
          tokenId: nft.tokenId,
          amount: priceWatched,
          tokenType: tokenTypeWatched,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft, tokenTypeWatched, isReady, priceWatched]);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Flex mt="4" alignItems={'center'} justifyContent={'space-between'}>
        <Text mt="4">{t('name')}</Text>
        <Text>{nft?.name}</Text>
      </Flex>
      <Flex mt="4" alignItems={'center'} justifyContent={'space-between'}>
        <Text mt="4">{t('token_id')}</Text>
        <Text>#{nft?.tokenId}</Text>
      </Flex>
      <ReceiveWidget />

      <Flex mt="4" alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Text mt="4">{t('network_gas')}</Text>
        </Box>

        <EditInputField
          value={paymentAmountWatched}
          onChange={handleOnFeeChange}
          isLoading={isEstimating}
        />
      </Flex>
      <Flex mt="4">
        <Text mt="4">{t('estimated_result')}</Text>
        <Text
          mt="4"
          ml="auto"
          color={getColorByStatus(estimatedResult?.status)}
        >
          {isEstimating ? <TripleDotLoading /> : estimatedResult?.status || '-'}
        </Text>
      </Flex>
      <Flex mt="8">
        <Button
          variant="primary"
          mr={3}
          type="submit"
          w="100%"
          disabled={isDisabled}
          isLoading={isEstimating || isListing || !isReady}
          loadingText={isEstimating && t('estimating')}
        >
          {isDisabled ? t('insufficient_balance') : t('confirm')}
        </Button>
      </Flex>
    </form>
  );
};

export default ModalReview;
