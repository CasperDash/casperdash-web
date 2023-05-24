import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import Big from 'big.js';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Receipt from './Receipt';
import RoutePaths from './RoutePaths';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import Modal from '@/components/Modal';
import { Config } from '@/config';
import { TokenTypesEnum } from '@/enums/tokenTypes';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useAccount } from '@/hooks/useAccount';
import { useMutateSwapTokens } from '@/modules/Swap/hooks/useMutateSwapTokens';
import { FieldValues } from '@/modules/Swap/type';
import { calculateAmountOutMin } from '@/modules/Swap/utils';
import { PairRouteData } from '@/services/friendlyMarket/amm/type';
import { Token } from '@/services/friendlyMarket/tokens';
import { FUNCTIONS } from '@/utils/casper/tokenServices';

type ModalConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (token: Token) => void;
};

const ModalConfirm = ({ isOpen, onClose }: ModalConfirmProps) => {
  const { toastSuccess } = useI18nToast();
  const { t } = useTranslation();
  const { publicKey } = useAccount();

  const { mutate, isLoading } = useMutateSwapTokens({
    onSuccess: (result: string | undefined) => {
      toastSuccess('deploy_hash', { deployHash: result || '' });
    },
  });
  const { getValues } = useFormContext<FieldValues>();

  const handleOnConfirm = () => {
    const values = getValues();
    const { swapFrom, swapTo, pair, swapSettings } = values;
    const amountInValue = Big(swapFrom.amount || 0)
      .round(swapFrom.decimals, 0)
      .toNumber();

    let path = [swapFrom.contractHash, swapTo.contractHash].map(
      (hash) => `hash-${hash}`
    );
    const routingPair = pair as PairRouteData;
    if (routingPair.isUsingRouting) {
      path = routingPair.path;
    }
    const amountOutMin = calculateAmountOutMin(
      swapTo.amount || 0,
      swapSettings.slippage,
      swapTo.decimals
    );

    const amountIn = Big(amountInValue * 10 ** swapFrom.decimals).toNumber();

    const amountOut = Big(amountOutMin * 10 ** swapTo.decimals).toNumber();

    if (
      swapFrom.type === TokenTypesEnum.NATIVE &&
      swapTo.type === TokenTypesEnum.ERC20
    ) {
      return mutate({
        functionType: FUNCTIONS.SWAP_EXACT_CSPR_FOR_TOKENS,
        amountIn,
        amountOut,
        deadlineInMinutes: swapSettings.deadline,
        path,
      });
    }

    if (
      swapFrom.type === TokenTypesEnum.ERC20 &&
      swapTo.type === TokenTypesEnum.NATIVE
    ) {
      return mutate({
        functionType: FUNCTIONS.SWAP_EXACT_TOKENS_FOR_CSPR,
        amountIn,
        amountOut,
        deadlineInMinutes: swapSettings.deadline,
        path,
      });
    }

    if (
      swapFrom.type === TokenTypesEnum.ERC20 &&
      swapTo.type === TokenTypesEnum.ERC20
    ) {
      if (routingPair.isUsingRouting) {
        return mutate({
          functionType: FUNCTIONS.SWAP_EXACT_TOKENS_FOR_TOKENS,
          amountIn,
          amountOut,
          deadlineInMinutes: swapSettings.deadline,
          path,
        });
      }

      return mutate({
        functionType: FUNCTIONS.SWAP_TOKENS_FOR_EXACT_TOKENS,
        amountIn,
        amountOut,
        deadlineInMinutes: swapSettings.deadline,
        path,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('swap_confirmation')}>
      <Flex direction="column" justifyContent="space-between">
        <Box>
          <Flex
            justifyContent={'center'}
            backgroundColor="gray.100"
            p="4"
            borderRadius="sm"
          >
            <RoutePaths />
          </Flex>
          <Divider mt="6" />
          <Flex direction="column" mt="4" gap="2">
            <Flex justifyContent="space-between">
              <Text>{t('contract_hash')}</Text>
              <MiddleTruncatedText
                startLength={8}
                endLength={8}
                value={Config.swapContractHash}
              />
            </Flex>
            <Flex justifyContent="space-between">
              <Text>{t('receiving_address')}</Text>
              <MiddleTruncatedText
                startLength={8}
                endLength={8}
                value={publicKey || ''}
              />
            </Flex>
            <Flex justifyContent="space-between">
              <Text>{t('payment_amount')}</Text>
              <Text isTruncated maxW="4xs">
                {}
              </Text>
            </Flex>
          </Flex>
          <Divider mt="6" />
          <Receipt w="100%" mt="4" />
        </Box>
        <Flex mt="8">
          <Button
            variant="primary"
            onClick={handleOnConfirm}
            isLoading={isLoading}
            w="100%"
          >
            {t('confirm')}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ModalConfirm;
