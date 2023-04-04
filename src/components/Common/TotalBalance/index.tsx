import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';

import Paper from '../../Paper';
import { useGetCoingeckoCoin } from '@/hooks/queries/useGetCoingeckoCoin';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';

export type TotalBalanceProps = {
  marketCapValue: number;
  dayVolumeValue: number;
} & BoxProps;
const TotalBalance = ({
  marketCapValue,
  dayVolumeValue,
  ...restProps
}: TotalBalanceProps) => {
  const { t } = useTranslation();
  const { data } = useGetCurrentAccount();
  const { data: { price } = { price: 0 } } = useGetCoingeckoCoin();

  return (
    <Paper {...restProps} p="0" py="8" minH="xs">
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
          <Box mt="3">
            <Heading variant="2xl">
              {t('intlAssetNumber', {
                asset: 'CSPR',
                val: data?.balance || 0,
              })}
            </Heading>
          </Box>
          <Box mt="3">
            <Text color="gray.500" lineHeight="6" fontSize="sm">
              {t('intlNumber', {
                val: _.get(data, 'balance', 0) * price,
              })}
            </Text>
          </Box>
        </Flex>
        <Flex pos="relative" flex="1">
          <Box flex="1" pl="7" pt="8">
            <Text>{t('total_volume')}</Text>
            <Box mt="3">
              <Heading variant="xl">
                {t('intlNumber', {
                  val: marketCapValue,
                })}
              </Heading>
            </Box>
          </Box>
          <Box
            pos="absolute"
            left="50%"
            height="142px"
            borderLeft="1px solid"
            borderColor="gray.200"
          ></Box>
          <Box flex="1" pl="7" pt="8">
            <Text>{t('24h_volume')}</Text>
            <Box mt="3">
              <Heading variant="xl">
                {t('intlNumber', {
                  val: dayVolumeValue,
                })}
              </Heading>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default TotalBalance;
