import React, { useMemo } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import {
  ComposedChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
} from 'recharts';

import { useGetCurrentMarketNFTPriceHistory } from '../../hooks/useGetCurrentMarketNFTPriceHistory';
import { toCSPR } from '@/utils/currency';
import { formatReadableDate } from '@/utils/date';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        background="white"
        padding={2}
        borderRadius={'xl'}
        textAlign="center"
        outline={'none !important'}
      >
        <Box mb="2" fontSize={'md'}>
          {payload[0].value} CSPR
        </Box>

        <div>
          <Box fontSize={'sm'}>{payload[0].payload.timestamp}</Box>
        </div>
      </Box>
    );
  }

  return null;
};

const NFTPriceChart = () => {
  const { data = [] } = useGetCurrentMarketNFTPriceHistory();

  const normalizedData = useMemo(() => {
    if (!data) return [];
    const dataPrices = data.map((item) => {
      return {
        timestamp: formatReadableDate(item.timestamp),
        price: toCSPR(item.price),
      };
    });

    return dataPrices;
    return [dataPrices[0]];
  }, [data]);

  if (!data) {
    return (
      <Flex
        direction="column"
        justifyContent={'space-between'}
        alignItems={'center'}
        w="100%"
        h="100%"
        pt="4"
      >
        No events have occurred yet
      </Flex>
    );
  }

  return (
    <Box h="240" pt="4" bg="#F0F0F0">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={normalizedData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <defs>
            <linearGradient id="nftPriceHistory" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#58BD7D" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#58BD7D" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: 'none' }}
          />
          {normalizedData.length > 1 ? (
            <Area
              type="monotone"
              dataKey="price"
              stroke="#58BD7D"
              fillOpacity={1}
              fill="url(#nftPriceHistory)"
            />
          ) : (
            <Bar
              dataKey="price"
              label="Avg. price"
              barSize={10}
              fill="#58BD7D"
            />
          )}
          <XAxis dataKey="timestamp" tick={false} />
          <YAxis />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default NFTPriceChart;
