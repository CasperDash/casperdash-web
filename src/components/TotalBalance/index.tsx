import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Paper from '../Paper';

export type TotalBalanceProps = {
  totalVolumeValue: string;
  dayVolumeValue: string;
} & BoxProps;
const TotalBalance = ({
  totalVolumeValue,
  dayVolumeValue,
  ...restProps
}: TotalBalanceProps) => {
  const { t } = useTranslation();

  return (
    <Paper {...restProps} p="0" py="8">
      <Flex direction="column">
        <Flex
          borderBottom="1px solid"
          borderColor="gray.200"
          pb="8"
          flex="1"
          pl="7"
          direction="column"
        >
          <Box>
            <Text>{t('total_balance')}</Text>
          </Box>
          <Box>
            <Text>1.00069787 CSPR</Text>
          </Box>
          <Box>
            <Text>$10,098.36</Text>
          </Box>
        </Flex>
        <Flex pos="relative" flex="1">
          <Box flex="1" pl="7" pt="8">
            <Text>{t('total_volume')}</Text>
            <Box>${totalVolumeValue}</Box>
          </Box>
          <Box
            pos="absolute"
            left="50%"
            height="183px"
            borderLeft="1px solid"
            borderColor="gray.200"
          ></Box>
          <Box flex="1" pl="7" pt="8">
            <Text>{t('24h_volume')}</Text>
            <Box>${dayVolumeValue}</Box>
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default TotalBalance;
