import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ListRewards from './components/ListRewards';
import ListStakeds from './components/ListStakeds';
import ListStakingHistories from './components/ListStakingHistories';
import RewardInfo from './components/RewardInfo';
import StakingForm from './components/StakingForm';
import StakingRewardsChart from './components/StakingRewardsChart';
import StakingRewardsByDate from './components/StakingRewardsChart/StakingRewardsByDate';

const Staking = () => {
  const { t } = useTranslation();

  return (
    <Flex
      alignItems={'center'}
      flexDir={'column'}
      justify={'center'}
      mt={{ base: '6', lg: '20' }}
      w={'100%'}
    >
      <Box width={'80%'} ml="auto" mr="auto">
        <StakingRewardsByDate />
        <StakingRewardsChart />
      </Box>
      <Tabs
        variant={'soft-rounded'}
        colorScheme="blackAlpha"
        w={{ base: '100%', lg: '60%' }}
        alignItems={'center'}
        display={'flex'}
        flexDir={'column'}
      >
        <TabList>
          <Tab fontSize={{ base: 'sm' }}>{t('staked_info')}</Tab>
          <Tab fontSize={{ base: 'sm' }}>{t('staked_rewards')}</Tab>
          <Tab fontSize={{ base: 'sm' }}>{t('staked_history')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StakingForm />
            <ListStakeds mt="8" />
          </TabPanel>
          <TabPanel>
            <RewardInfo />
            <ListRewards mt="8" />
          </TabPanel>
          <TabPanel>
            <Flex justifyContent={'center'}>
              <ListStakingHistories mt="6" />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Staking;
