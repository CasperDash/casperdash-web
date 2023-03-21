import { Badge, Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import { Area, AreaChart } from 'recharts';

import Paper from '@/components/Paper';

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

const ChartCSPRPrice = ({ ...restProps }: ChartCSPRPriceProps) => {
  return (
    <Paper {...restProps} p="6">
      <Flex direction="column" justifyContent="space-between">
        <Box>
          <Flex alignItems="center">
            <Text color="gray.500" fontWeight="semibold" fontSize="xl">
              CSPR
            </Text>
            <Badge
              ml="1"
              bgColor="green.300"
              color="white"
              borderRadius="3xl"
              fontSize="xs"
              p="1"
            >
              +12.96%
            </Badge>
          </Flex>
        </Box>
        <Box mt="2">
          <Heading fontSize="xl">$ 1.00069787</Heading>
        </Box>
        <Box mt="4">
          <AreaChart
            width={500}
            height={200}
            data={data}
            margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#58BD7D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#58BD7D" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* <Tooltip /> */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#58BD7D"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </Box>
      </Flex>
    </Paper>
  );
};

export default ChartCSPRPrice;
