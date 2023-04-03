import _snakeCase from 'lodash/snakeCase';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const useI18nToast = () => {
  const { t, i18n } = useTranslation(['message']);

  const toastError = (
    messageKey: string,
    options: Record<string, string | number> = {}
  ) => {
    const tKey = `error.${_snakeCase(messageKey)}`;
    let currentKey = 'error.default';
    if (i18n.exists(`message:${tKey}`)) {
      currentKey = tKey;
    }
    toast.error(t(currentKey, options));
  };

  const toastSuccess = (
    messageKey: string,
    options: Record<string, string | number> = {}
  ) => {
    console.log('messageKey: ', messageKey);
    const tKey = `success.${_snakeCase(messageKey)}`;
    let currentKey = 'success.default';
    if (i18n.exists(`message:${tKey}`)) {
      currentKey = tKey;
    }
    toast.success(t(currentKey, options));
  };

  return {
    toastError,
    toastSuccess,
  };
};
