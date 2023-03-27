import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Area, AreaChart, Tooltip, TooltipProps } from 'recharts';

import { useGetCoingeckoHistories } from '@/hooks/queries/useGetCoingeckoHistories';

// const data: { year: number; value: number }[] = [];

// const rand = 300;
// for (let i = 0; i < 7; i++) {
//   const d = {
//     year: 2000 + i,
//     value: Math.random() * (rand + 50) + 100,
//   };

//   data.push(d);
// }

type Props = {
  width?: number;
  height?: number;
};

const CustomTooltip = ({ active, payload }: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    return (
      <Box>
        <Box>{`${dayjs(payload[0].payload.timestamp, 'YYYY MMMM DD')}`}</Box>
        <Box>{`${payload[0].value}`}</Box>
      </Box>
    );
  }

  return null;
};

const AreaChartPrice = ({ width = 500, height = 200 }: Props) => {
  const { data } = useGetCoingeckoHistories();

  return (
    <AreaChart
      width={width}
      height={height}
      data={data || []}
      margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
    >
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
  );
};

export default AreaChartPrice;
