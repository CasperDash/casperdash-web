import { useClipboard } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';

import { useTimeout } from './useTimeout';
import { TimeEnum } from '@/enums/time';

export const useSafeClipboard = (value: string) => {
  const {
    onCopy,
    setValue,
    value: valueToCopy,
    hasCopied,
  } = useClipboard(value);

  const startTimeOut = useTimeout(() => {
    copy(' ');
  }, TimeEnum.ONE_MINUTE);

  const handleOnCopy = () => {
    onCopy();

    startTimeOut();
  };

  return {
    value: valueToCopy,
    setValue,
    onCopy: handleOnCopy,
    hasCopied,
  };
};
