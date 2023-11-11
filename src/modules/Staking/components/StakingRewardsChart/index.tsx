import { useMemo } from 'react';

import { Center, Spinner, Box, HStack, Text } from '@chakra-ui/react';
import format from 'date-fns/format';
import groupBy from 'lodash-es/groupBy';
import reverse from 'lodash-es/reverse';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

import { useGetDelegatorRewards } from '@/hooks/queries/useGetDelegatorRewards';
import { useAccount } from '@/hooks/useAccount';
import colors from '@/theme/foundations/colors';
import { toCSPR } from '@/utils/currency';

// const series = [
//   {
//     name: 'Validator A',
//     data: [
//       { timestamp: 'A', value: Math.random() },
//       { timestamp: 'B', value: Math.random() },
//       { timestamp: 'C', value: Math.random() },
//     ],
//   },
//   {
//     name: 'Validator B',
//     data: [
//       { timestamp: 'B', value: Math.random() },
//       { timestamp: 'C', value: Math.random() },
//       { timestamp: 'D', value: Math.random() },
//     ],
//   },
//   {
//     name: 'Validator C',
//     data: [
//       { timestamp: 'C', value: Math.random() },
//       { timestamp: 'D', value: Math.random() },
//       { timestamp: 'E', value: Math.random() },
//     ],
//   },
// ];

const CustomTooltip = (props: any) => {
  console.log(`🚀 ~ CustomTooltip ~ props:`, props);
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    const timeLabel = format(new Date(label), 'MM-dd hh:mm');
    return (
      <Box
        p={2}
        borderRadius={'sm'}
        bgColor="blackAlpha.200"
        className="custom-tooltip"
        maxW={'xs'}
      >
        <p className="label">{timeLabel}</p>
        {payload.map((series) => {
          const { payload: payloadSeries } = series;
          return (
            <HStack
              key={`${payloadSeries.validatorPublicKey}-${series.value}`}
              className="intro"
            >
              <Text isTruncated maxW="100px">
                {payloadSeries.validatorPublicKey}
              </Text>
              <Text isTruncated maxW="xs">
                {toCSPR(series.value)}
              </Text>
            </HStack>
          );
        })}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </Box>
    );
  }

  return null;
};

const StakingRewardsChart = () => {
  const { publicKey } = useAccount();
  const {
    data: { data: delegatorRewards } = { data: [] },
    isLoading: isLoadingDelegatorRewards,
  } = useGetDelegatorRewards({
    publicKey,
  });

  const rewardData = useMemo(() => {
    // Reversed
    const reversed = reverse([...delegatorRewards]);

    // Clone data
    const clonedData = reversed.map((item) => ({
      ...item,
      validatorPublicKey: `${item.validatorPublicKey}-mock-1`,
      amount: parseInt(item.amount, 10) - 2_500_000,
    }));
    const compoundData = [...reversed, ...clonedData];

    // Real data below
    const groupedDataByValidator = groupBy(compoundData, 'validatorPublicKey');
    const result = Object.keys(groupedDataByValidator).map((validator) => {
      return {
        name: validator,
        data: groupedDataByValidator[validator],
      };
    });

    return result;
  }, [delegatorRewards]);
  // console.log(`🚀 ~ rewardData ~ rewardData:`, rewardData);
  // console.log(`🚀 ~ StakingRewardsChart ~ delegatorRewards:`, delegatorRewards);

  if (isLoadingDelegatorRewards) {
    return (
      <Center mt="8">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box height={400}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          margin={{
            top: 40,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            allowDuplicatedCategory={false}
            tickFormatter={(value) => format(new Date(value), 'MM-dd')}
            dataKey="timestamp"
          />
          <YAxis
            type="number"
            tickFormatter={(value: number) => {
              return toCSPR(value as number);
            }}
          >
            <Label
              style={{
                textAnchor: 'middle',
                fontSize: '100%',
                fill: 'black',
              }}
              position="top"
              offset={24}
              value={'Rewards'}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {rewardData.map((series) => {
            return (
              <Line
                key={series.name}
                type="monotone"
                data={series.data}
                dataKey="amount"
                stroke={colors.primary}
                dot={false}
                activeDot={false}
                strokeWidth="2"
              />
            );
          })}
          {/* <Line
            type="monotone"
            dataKey="amount"
            stroke={colors.primary}
            dot={false}
            activeDot={false}
            strokeWidth="2"
          /> */}
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StakingRewardsChart;
