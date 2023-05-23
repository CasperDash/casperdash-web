import { Box, Button, Divider, Flex } from '@chakra-ui/react';
import Big from 'big.js';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ButtonReverse from './ButtonReverse';
import RadioPercentSelect from './RadioPercentSelect';
import Receipt from './Receipt';
import SelectSwapFrom from './SelectSwapFrom';
import SelectSwapTo from './SelectSwapTo';
import Setting from './Setting';
import { calculateAmountOutMin } from '../../utils';
import Paper from '@/components/Paper';
import CircleWrapper from '@/components/Surface/CircleWrapper';
import { TokenTypesEnum } from '@/enums/tokenTypes';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { RefreshIcon } from '@/icons';
import { useMutateSwapTokens } from '@/modules/Swap/hooks/useMutateSwapTokens';
import { PairData, PairRouteData } from '@/services/friendlyMarket/amm/type';
import { Token } from '@/services/friendlyMarket/tokens';
import { FUNCTIONS } from '@/utils/casper/tokenServices';

type FieldValues = {
  swapFrom: Token;
  swapTo: Token;
  swapSettings: {
    slippage: number;
    deadline: number;
  };
  pair: PairData | PairRouteData;
};

const SwapForm = () => {
  const { toastSuccess } = useI18nToast();
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutateSwapTokens({
    onSuccess: (result: string | undefined) => {
      toastSuccess('deploy_hash', { deployHash: result || '' });
    },
  });
  const methods = useForm<FieldValues>({
    defaultValues: {
      swapFrom: {},
      swapTo: {},
      swapSettings: {
        slippage: 0,
        deadline: 0,
      },
      pair: {},
    },
  });

  const handleOnSubmit = (values: FieldValues) => {
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
    <Box>
      <Box mt="5">
        <Flex justifyContent={'center'} alignItems="center" gap="4">
          <Setting />
          <CircleWrapper
            backgroundColor={'gray.200'}
            p="5px"
            size={10}
            cursor="pointer"
            _hover={{ color: 'light' }}
          >
            <Box ml="1.2px" mt="1.7px">
              <RefreshIcon width="24px" height="20px" />
            </Box>
          </CircleWrapper>
        </Flex>
      </Box>
      <Paper mt="4" px="8" py="8">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
            <SelectSwapFrom />
            <Box mt="8">
              <RadioPercentSelect />
            </Box>
            <ButtonReverse />
            <SelectSwapTo />
            <Flex justify={'center'} mt="8">
              <Button
                variant="primary"
                type="submit"
                w="100%"
                isLoading={isLoading}
              >
                {t('confirm')}
              </Button>
            </Flex>
            <Divider mt="6" w="100%" />
            <Receipt />
          </form>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default SwapForm;
