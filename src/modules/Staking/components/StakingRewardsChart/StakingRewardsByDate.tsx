import { useMemo } from 'react';

import { Center, Spinner, Box, HStack, Text } from '@chakra-ui/react';
import Big from 'big.js';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
  AreaChart,
  Area,
} from 'recharts';

import { CSPRValue } from '@/components/Common/TokenValue';
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
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    const timeLabel = format(new Date(label), 'MM-dd');
    return (
      <Box
        p={2}
        borderRadius={'sm'}
        bgColor="blackAlpha.200"
        className="custom-tooltip"
        maxW={'xs'}
      >
        <p className="label">{timeLabel}</p>
        {payload.map((series: any) => {
          const { payload: payloadSeries } = series;
          return (
            <HStack key={`${payloadSeries.date}`} className="intro">
              <Text isTruncated maxW="xs">
                <CSPRValue value={toCSPR(series.value).toString()} />
                {/* {toCSPR(series.value)} */}
              </Text>
            </HStack>
          );
        })}
      </Box>
    );
  }

  return null;
};

const StakingRewardsByDate = () => {
  const { publicKey } = useAccount();
  const {
    data: { data: delegatorRewards } = { data: [] },
    isLoading: isLoadingDelegatorRewards,
  } = useGetDelegatorRewards({
    publicKey,
  });
  const chartColor = colors.cyan['600'];
  const boxProps = {
    p: 8,
    mb: 4,
    background: 'panelBackground',
    shadow: 'panelShadow',
    borderRadius: '16px',
  };

  const generateRewards = (data) => {
    const map = new Map();

    // Last 7 days
    // const endDate = new Date();
    // const startDate = sub(endDate, {
    //   days: 7,
    // });

    for (const item of data) {
      // console.log(`🚀 ~ generateRewards ~ item:`, item);
      const dateOnly = formatISO(new Date(item.timestamp), {
        representation: 'date',
      });
      const reward = Big(item.amount);

      if (map.has(dateOnly)) {
        const currReward = map.get(dateOnly).amount;
        const newReward = reward.plus(currReward);
        map.set(dateOnly, {
          amount: newReward.toNumber(),
        });
      } else {
        map.set(dateOnly, {
          amount: reward.toNumber(),
        });
      }
    }
    // console.log('>> ZZ: ', map, map.values());

    // Generate data shape
    const resultRewardEachDay = [];
    map.forEach((value, key) => {
      resultRewardEachDay.push({
        date: key,
        value: value.amount,
      });
    });

    const resultRewardEachDayReversed = [...resultRewardEachDay].reverse();

    // Calculate total reward by day
    const resultAccRewardByDay = [];
    for (let index = 0; index < resultRewardEachDayReversed.length; index++) {
      if (index === 0) {
        resultAccRewardByDay.push(resultRewardEachDayReversed[index]);
        continue;
      }

      const prevDate = resultAccRewardByDay[index - 1];
      const prevReward = Big(prevDate.value);
      const currDate = resultRewardEachDayReversed[index];

      resultAccRewardByDay.push({
        ...currDate,
        value: prevReward.plus(currDate.value).toNumber(),
      });
    }

    // return resultA;
    return {
      resultRewardEachDay: resultRewardEachDayReversed,
      resultAccRewardByDay,
    };
  };

  const rewardData = useMemo(() => {
    const result = generateRewards(delegatorRewards);
    return result;
    // return delegatorRewards;
  }, [delegatorRewards]);

  if (isLoadingDelegatorRewards) {
    return (
      <Center mt="8">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <Box {...boxProps} height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={450}
            height={200}
            data={rewardData.resultAccRewardByDay}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              tickFormatter={(value) => format(new Date(value), 'MM-dd')}
              allowDuplicatedCategory={false}
              dataKey="date"
            />
            <YAxis
              tickFormatter={(value: number) => {
                return toCSPR(value as number);
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Box {...boxProps} height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={450}
            height={200}
            data={rewardData.resultRewardEachDay}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              tickFormatter={(value) => format(new Date(value), 'MM-dd')}
              allowDuplicatedCategory={false}
              dataKey="date"
            />
            <YAxis
              tickFormatter={(value: number) => {
                return toCSPR(value as number);
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Box {...boxProps} height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={450}
            height={200}
            data={rewardData.resultRewardEachDay}
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
              dataKey="date"
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

            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              dot={false}
              activeDot={true}
              strokeWidth="2"
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default StakingRewardsByDate;
