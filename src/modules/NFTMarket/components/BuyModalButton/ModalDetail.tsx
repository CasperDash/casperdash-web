import { Button, Box, Text, Flex, Image } from '@chakra-ui/react';
import Big from 'big.js';
import { useTranslation } from 'react-i18next';

import { useBuyItem } from '../../hooks/useBuyItem';
import NFTDefaultImg from '@/assets/img/nft-default.png';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { IMarketNFT } from '@/services/casperdash/market/type';
import { toCSPR } from '@/utils/currency';

type Props = {
  nft?: IMarketNFT;
  onSuccessfulBuy?: (deployResponse: DeployResponse) => void;
};

const ModalDetail = ({ nft, onSuccessfulBuy }: Props) => {
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  const { t } = useTranslation();
  const { toastSuccess, toastError } = useI18nToast();
  const {
    mutate,
    isLoading: isBuying,
    feeNetwork,
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
    });
  };

  const totalPayment = Big(toCSPR(nft?.listingAmount || 0))
    .add(feeNetwork)
    .toNumber();
  const isDisabled = balance < totalPayment;

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
