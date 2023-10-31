import { Button, Box, Text, Flex, Image } from '@chakra-ui/react';
import Big from 'big.js';
import { useTranslation } from 'react-i18next';

import { useBuyItem } from '../../hooks/useBuyItem';
import { useGetMarketNFT } from '../../hooks/useGetMarketNFT';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { toCSPR } from '@/utils/currency';

type Props = {
  tokenId?: string;
  name?: string;
  tokenContractHash?: string;
  listingAmount?: number;
  image?: string;
  onSuccessfulBuy?: (deployResponse: DeployResponse) => void;
};

const ModalDetail = ({
  tokenId,
  name,
  tokenContractHash,
  listingAmount,
  image,
  onSuccessfulBuy,
}: Props) => {
  const { data, isLoading: isLoadingMarketNFT } = useGetMarketNFT({
    tokenAddress: tokenContractHash,
    tokenId: tokenId,
  });
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  const { t } = useTranslation();
  const { toastSuccess } = useI18nToast();
  const {
    mutate,
    isLoading: isBuying,
    feeNetwork,
  } = useBuyItem({
    onSuccess: (deployResponse: DeployResponse) => {
      toastSuccess('buy_success');
      onSuccessfulBuy?.(deployResponse);
    },
  });

  const handleOnBuy = () => {
    if (!tokenId || !tokenContractHash || !listingAmount) {
      return;
    }

    mutate({
      token: `hash-${tokenContractHash}`,
      tokenId: tokenId,
      amount: listingAmount,
    });
  };

  const totalPayment = Big(toCSPR(listingAmount || 0))
    .add(feeNetwork)
    .toNumber();
  const isDisabled = balance < totalPayment;

  return (
    <>
      <Box>
        <Image borderRadius={'2xl'} src={image} alt="NFT image" />
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
          <Text>{name}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('contract_hash')}</Text>
          <MiddleTruncatedText value={tokenContractHash} />
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('token_id')}</Text>
          <Text>{tokenId}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('price')}</Text>
          <Text>
            {t('intlAssetNumber', {
              val: toCSPR(listingAmount || 0),
              asset: 'CSPR',
            })}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('royalties')}</Text>
          <Text>
            {isLoadingMarketNFT ? '...' : data?.tokenContract?.royaltyFee}%
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('network_fee')}</Text>
          <Text>
            {t('intlAssetNumber', {
              val: feeNetwork,
              asset: 'CSPR',
            })}
          </Text>
        </Flex>
      </Flex>
      <Box mt="8">
        <Flex mt="8">
          <Button
            variant="primary"
            mr={3}
            type="submit"
            w="100%"
            onClick={handleOnBuy}
            isLoading={isBuying}
            isDisabled={isDisabled}
          >
            {isDisabled ? t('insufficient_balance') : t('buy')}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default ModalDetail;
