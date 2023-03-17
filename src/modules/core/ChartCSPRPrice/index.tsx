import { Badge, Box, BoxProps, Flex, Text } from '@chakra-ui/react';
import { LineChart, Line } from 'recharts';

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
            <Text>CSPR</Text>
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
          <Text fontSize="xl">$ 1.00069787</Text>
        </Box>
        <Box mt="4">
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </Box>
      </Flex>
    </Paper>
  );
};

export default ChartCSPRPrice;
