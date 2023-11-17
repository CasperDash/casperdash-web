import { useEffect, useState } from 'react';

import { Button, Box, Text, Flex, Image } from '@chakra-ui/react';
import Big from 'big.js';
import { useTranslation } from 'react-i18next';

import { useBuyItem } from '../../hooks/useBuyItem';
import NFTDefaultImg from '@/assets/img/nft-default.png';
import EditInputField from '@/components/Common/EditInputField';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import TripleDotLoading from '@/components/Loading/TripleDotLoading';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateEstimateFee } from '@/hooks/mutates/useMutateEstimateFee';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { IMarketNFT } from '@/services/casperdash/market/type';
import { getColorByStatus } from '@/utils/color';
import { toCSPR } from '@/utils/currency';

type Props = {
  nft?: IMarketNFT;
  onSuccessfulBuy?: (deployResponse: DeployResponse) => void;
};

const ModalDetail = ({ nft, onSuccessfulBuy }: Props) => {
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();
  const [paymentAmount, setPaymentAmount] = useState('0');

  const { t } = useTranslation();
  const { toastSuccess, toastError } = useI18nToast();
  const {
    mutate,
    isLoading: isBuying,
    feeNetwork,
    buildFn,
  } = useBuyItem(
    {
      tokenType: nft?.tokenContract?.tokenType,
    },
    {
      onSuccess: (deployResponse: DeployResponse) => {
        toastSuccess('buy_success');
        onSuccessfulBuy?.(deployResponse);
      },
    }
  );
  const {
    mutate: estimateFee,
    data: estimatedResult,
    isLoading: isEstimating,
  } = useMutateEstimateFee({
    onSuccess: (data) => {
      setPaymentAmount(data?.cost || '0');
    },
  });

  const handleOnBuy = () => {
    const { tokenId, listingAmount } = nft || {};
    if (!tokenId || !listingAmount || !nft?.tokenContract?.tokenContractHash) {
      toastError('invalid_nft');
      return;
    }

    mutate({
      token: `hash-${nft?.tokenContract?.tokenContractHash}`,
      tokenId: tokenId,
      amount: listingAmount,
      paymentAmount,
    });
  };

  const totalPayment = Big(toCSPR(nft?.listingAmount || 0))
    .add(feeNetwork)
    .toNumber();
  const isDisabled = balance < totalPayment;

  const handleOnChangePaymentAmount = (value: string) => {
    setPaymentAmount(value);
  };

  useEffect(() => {
    if (nft?.listingAmount) {
      estimateFee(() =>
        buildFn({
          token: `hash-${nft?.tokenContract?.tokenContractHash}`,
          tokenId: nft?.tokenId,
          amount: nft?.listingAmount,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft?.listingAmount, nft?.tokenContract?.tokenContractHash, nft?.tokenId]);

  return (
    <>
      <Box>
        <Image
          borderRadius={'2xl'}
          src={nft?.image}
          alt="NFT image"
          onError={(e) => {
            e.currentTarget.src = NFTDefaultImg;
          }}
        />
      </Box>
      <Flex
        mt="4"
        borderRadius={'2xl'}
        border={'1px'}
        borderColor={'gray.200'}
        bgColor={'gray.200'}
        p="4"
        gap="2"
        flexDirection="column"
      >
        <Flex justifyContent="space-between">
          <Text>{t('name')}</Text>
          <Text>{nft?.name}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('contract_hash')}</Text>
          <MiddleTruncatedText value={nft?.tokenContract?.tokenContractHash} />
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('token_id')}</Text>
          <Text>{nft?.tokenId}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('price')}</Text>
          <Text>
            {t('intlAssetNumber', {
              val: toCSPR(nft?.listingAmount || 0),
              asset: 'CSPR',
            })}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('royalties')}</Text>
          <Text>{nft?.tokenContract?.royaltyFee}%</Text>
        </Flex>
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
          {isEstimating ? <TripleDotLoading /> : estimatedResult?.status || '-'}
        </Text>
      </Flex>
      <Box mt="8">
        <Flex mt="8">
          <Button
            variant="primary"
            mr={3}
            type="submit"
            w="100%"
            onClick={handleOnBuy}
            isLoading={isBuying || isEstimating}
            isDisabled={isDisabled}
            loadingText={isEstimating && t('estimating')}
          >
            {isDisabled ? t('insufficient_balance') : t('buy')}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default ModalDetail;
