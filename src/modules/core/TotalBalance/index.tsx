import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Paper from '../../../components/Paper';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { useGetDelegation } from '@/hooks/queries/useGetDelegation';
import { useGetCSPRMarketInfo } from '@/hooks/queries/usePrice';

export type TotalBalanceProps = {
  marketCapValue: number;
  dayVolumeValue: number;
  circulatingSupply: number;
  totalSupply: number;
} & BoxProps;
const TotalBalance = ({
  marketCapValue,
  dayVolumeValue,
  circulatingSupply,
  totalSupply,
  ...restProps
}: TotalBalanceProps) => {
  const { t } = useTranslation();
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  const { data: { price = 0 } = { price: 0 } } = useGetCSPRMarketInfo();
  const { data } = useGetCurrentAccount();
  const { totalStaked } = useGetDelegation(data?.publicKey);

  return (
    <Paper {...restProps} p="0" py="8" minH="xs">
      <Flex direction="column">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex pb="8" flex="1" pl="7" direction="column">
            <Box>
              <Text>{t('total_balance')}</Text>
            </Box>
            <Flex mt="3" gap={3} alignItems={'center'}>
              <Heading variant="2xl">
                {t('intlNumber', {
                  asset: 'CSPR',
                  val: balance || 0,
                })}
              </Heading>
              <Text color="gray.500" lineHeight="6" fontSize="sm">
                (
                {t('intlNumber', {
                  val: balance * price,
                })}
                )
              </Text>
            </Flex>
          </Flex>
          <Flex pb="8" flex="1" pl="7" direction="column">
            <Box>
              <Text>Total Staked</Text>
            </Box>
            <Flex mt="3" gap={3}>
              <Heading variant="2xl">
                {t('intlAssetNumber', {
                  asset: 'CSPR',
                  val: totalStaked || 0,
                })}{' '}
              </Heading>
              <Text color="gray.500" lineHeight="6" fontSize="sm">
                (
                {t('intlNumber', {
                  val: totalStaked * price,
                })}
                )
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex pos="relative" flex="1">
          <Box
            flex="1"
            pl="7"
            pt="8"
            borderRight={'1px'}
            borderColor="gray.200"
          >
            <Text>{t('market_cap')}</Text>
            <Box mt="3">
              <Heading variant="xl">
                {t('intlNumber', {
                  val: marketCapValue,
                })}
              </Heading>
            </Box>
          </Box>
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
        <Flex pos="relative" flex="1">
          <Box
            flex="1"
            pl="7"
            pt="8"
            borderRight={'1px'}
            borderColor="gray.200"
          >
            <Text>{t('circulating_supply')}</Text>
            <Box mt="3">
              <Heading variant="xl">
                {t('intlNumberFormat', {
                  val: circulatingSupply,
                })}
              </Heading>
            </Box>
          </Box>
          <Box flex="1" pl="7" pt="8">
            <Text>{t('total_supply')}</Text>
            <Box mt="3">
              <Heading variant="xl">
                {t('intlNumberFormat', {
                  val: totalSupply,
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
