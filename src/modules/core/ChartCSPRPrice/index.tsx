import { Badge, Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import AreaChartPrice from './AreaChartPrice';
import Paper from '@/components/Paper';
import { useGetCSPRMarketInfo } from '@/hooks/queries/usePrice';

type ChartCSPRPriceProps = BoxProps;

const CoingeckoPriceText = () => {
  const { t } = useTranslation();
  const { data: price } = useGetCSPRMarketInfo();

  return (
    <Heading fontSize="xl">
      {t('intlNumber', {
        val: price?.price,
        minimumFractionDigits: 4,
      })}
    </Heading>
  );
};

const BadgePercentageChange = () => {
  const {
    data: { price_change_percentage_24h: priceChangePercentage24h } = {
      price_change_percentage_24h: 0,
    },
  } = useGetCSPRMarketInfo();
  let color;
  let text;
  if (priceChangePercentage24h >= 0) {
    color = `green.300`;
    text = `+${priceChangePercentage24h.toFixed(2)}`;
  } else {
    color = `red.300`;
    text = `${priceChangePercentage24h.toFixed(2)}`;
  }
  return (
    <Badge
      ml="1"
      bgColor={color}
      color="white"
      borderRadius="3xl"
      fontSize="sm"
      px="2"
    >
      {text}%
    </Badge>
  );
};

const ChartCSPRPrice = ({ ...restProps }: ChartCSPRPriceProps) => {
  return (
    <Paper {...restProps} p="6">
      <Flex direction="column" justifyContent="space-between">
        <Box>
          <Flex alignItems="center">
            <Text color="gray.500" fontWeight="semibold" fontSize="xl">
              CSPR
            </Text>
            <BadgePercentageChange />
          </Flex>
        </Box>
        <Box mt="2">
          <CoingeckoPriceText />
        </Box>
        <Box mt="4">
          <AreaChartPrice />
        </Box>
      </Flex>
    </Paper>
  );
};

export default ChartCSPRPrice;
