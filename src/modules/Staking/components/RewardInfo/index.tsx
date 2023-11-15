import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Paper from '@/components/Paper';
import { useGetTotalRewards } from '@/hooks/queries/useGetTotalReward';
import { useGetCSPRMarketInfo } from '@/hooks/queries/usePrice';
import { useAccount } from '@/hooks/useAccount';

export type RewardInfoProps = BoxProps;

const RewardInfo = ({ ...restProps }: RewardInfoProps) => {
  const { t } = useTranslation();
  const { publicKey } = useAccount();
  const { data: totalRewards = 0 } = useGetTotalRewards(publicKey);

  const { data: { price = 0 } = { price: 0 } } = useGetCSPRMarketInfo();

  return (
    <Paper {...restProps} p="4" border="none" w="100%">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        borderColor="gray.200"
        justifyContent={'center'}
      >
        <Flex flex="1" alignItems={'center'}>
          <Box>
            <Text>{t('total_reward')}: </Text>
          </Box>
          <Flex ml="2" gap={3} alignItems={'center'}>
            <Text variant="sm">
              {t('intlAssetNumber', {
                asset: 'CSPR',
                val: totalRewards || 0,
              })}
            </Text>
            <Text color="gray.500" lineHeight="6" fontSize="sm">
              (
              {t('intlNumber', {
                val: totalRewards * price,
              })}
              )
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default RewardInfo;
