import { Badge, Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import AreaChartPrice from './AreaChartPrice';
import Paper from '@/components/Paper';
import { useCoingeckoCoin } from '@/hooks/queries/useGetCoingeckoCoin';

const data: { year: number; value: number }[] = [];

const rand = 300;
for (let i = 0; i < 7; i++) {
  const d = {
    year: 2000 + i,
    value: Math.random() * (rand + 50) + 100,
  };

  data.push(d);
}

type ChartCSPRPriceProps = BoxProps;

const CoingeckoPriceText = () => {
  const { t } = useTranslation();
  const { data: coingeckoCoin } = useCoingeckoCoin();

  return (
    <Heading fontSize="xl">
      {t('intlNumber', {
        val: coingeckoCoin?.price,
        minimumFractionDigits: 8,
      })}
    </Heading>
  );
};

const BadgePercentageChange = () => {
  const {
    data: { priceChangePercentage24h } = { priceChangePercentage24h: 0 },
  } = useCoingeckoCoin();
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
      fontSize="xs"
      p="1"
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
