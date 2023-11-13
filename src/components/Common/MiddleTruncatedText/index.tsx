import React from 'react';

import {
  PlacementWithLogical,
  Text,
  TextProps,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { startAndEnd } from '@/utils/format';

type Props = {
  value?: string;
  startLength?: number;
  endLength?: number;
  textProps?: TextProps;
  placement?: PlacementWithLogical;
  isCopy?: boolean;
};
const MiddleTruncatedText = ({
  value,
  startLength = 5,
  endLength = 7,
  textProps,
  placement,
  isCopy,
}: Props) => {
  const { t } = useTranslation();
  const { onCopy, hasCopied } = useClipboard(value || '');

  const handleOnClick = () => {
    if (isCopy) {
      onCopy();
    }
  };

  if (!value) {
    return null;
  }
  if (startLength + endLength >= value.length) {
    return <Text {...textProps}>{value}</Text>;
  }

  return (
    <Tooltip label={value} placement={placement}>
      {hasCopied ? (
        <Text {...textProps} color={'green'}>
          {t('copied')}
        </Text>
      ) : (
        <Text
          cursor={isCopy ? 'pointer' : 'auto'}
          {...textProps}
          onClick={handleOnClick}
        >
          {startAndEnd(value, startLength, endLength)}
        </Text>
      )}
    </Tooltip>
  );
};

export default MiddleTruncatedText;
