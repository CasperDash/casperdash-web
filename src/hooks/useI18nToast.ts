import _snakeCase from 'lodash/snakeCase';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const useI18nToast = () => {
  const { t, i18n } = useTranslation();

  const toastError = (messageKey: string) => {
    console.log('messageKey: ', messageKey);
    const tKey = `error.${_snakeCase(messageKey)}`;
    let currentKey = 'error.default';
    if (i18n.exists(tKey)) {
      currentKey = tKey;
    }
    toast.error(t(currentKey));
  };

  const toastSuccess = (messageKey: string) => {
    console.log('messageKey: ', messageKey);
    const tKey = `success.${_snakeCase(messageKey)}`;
    let currentKey = 'success.default';
    if (i18n.exists(tKey)) {
      currentKey = tKey;
    }
    toast.success(t(currentKey));
  };

  return {
    toastError,
    toastSuccess,
  };
};
