import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type AssetTextProps = {
  value: string | number;
  asset: string;
} & FlexProps;

const AssetText = ({ value, asset, ...restProps }: AssetTextProps) => {
  const { t } = useTranslation();
  return (
    <Flex {...restProps}>
      <Text>{t('number', { val: value })}</Text>
      <Text color="gray.500" ml="1">
        {asset}
      </Text>
    </Flex>
  );
};

export default AssetText;
