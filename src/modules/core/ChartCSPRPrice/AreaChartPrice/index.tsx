import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';

import { usePriceHistories } from '@/hooks/queries/usePrice';

const CustomTooltip = ({ active, payload }: TooltipProps<string, string>) => {
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    return (
      <Box bg="white" p={2} borderRadius={8}>
        <Box>{`${dayjs(payload[0].payload.timestamp, 'YYYY MMMM DD')}`}</Box>
        <Box>
          {t('intlNumber', {
            val: payload[0].value,
          })}
        </Box>
      </Box>
    );
  }

  return null;
};

const AreaChartPrice = () => {
  const { data } = usePriceHistories();

  return (
    <ResponsiveContainer height={200} width="100%">
      <AreaChart data={data || []} margin={{ bottom: 30 }}>
        <defs>
          <linearGradient id="coinHistory" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#58BD7D" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#58BD7D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#58BD7D"
          fillOpacity={1}
          fill="url(#coinHistory)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartPrice;
