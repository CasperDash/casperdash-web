import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { useSelectToken } from './useSelectToken';
import { Token } from '@/services/friendlyMarket/tokens';

export const useValidateSwap = () => {
  const swapFrom: Token & { balance: number } = useSelectToken('swapFrom');
  const swapTo: Token & { balance: number } = useSelectToken('swapTo');
  const { t } = useTranslation();

  const validateSwap = useCallback(() => {
    if (!swapFrom.contractHash || !swapTo.contractHash) {
      return {
        isValid: false,
        error: t('please_select_token'),
      };
    }

    if (swapFrom.contractHash === swapTo.contractHash) {
      return {
        isValid: false,
        error: t('token_must_be_different'),
      };
    }

    if (!swapFrom.amount || swapFrom.amount <= 0) {
      return {
        isValid: false,
        error: t('please_enter_amount'),
      };
    }

    if (!swapTo.amount || swapTo.amount < 0) {
      return {
        isValid: false,
        error: t('please_enter_amount'),
      };
    }

    if (swapFrom.amount > swapFrom.balance) {
      return {
        isValid: false,
        error: t('insufficient_balance'),
      };
    }

    if (swapFrom.amount <= 0 && swapTo.amount > 0) {
      return {
        isValid: false,
        error: t('insufficient_for_this_trade'),
      };
    }

    return {
      isValid: true,
      error: '',
    };
  }, [swapFrom, swapTo, t]);

  return validateSwap;
};
