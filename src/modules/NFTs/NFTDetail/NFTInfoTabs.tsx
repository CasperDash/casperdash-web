import {
  Box,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';

import CardAttribute from '@/components/Common/CardAttribute';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { INFTInfo } from '@/services/casperdash/nft/type';

type Props = {
  nft: INFTInfo;
};

const NFT_INFO_ATTRIBUTES = [
  {
    key: 'totalSupply.hex',
    label: 'total_supply',
  },
  {
    key: 'contractName',
    label: 'contract_name',
  },
  {
    key: 'contractAddress',
    label: 'contract_address',
    isTruncate: true,
  },
  {
    key: 'tokenId',
    label: 'token_id',
  },
];

const NFTInfoTabs = ({ nft }: Props) => {
  const { t } = useTranslation();

  return (
    <Tabs variant="solid-rounded" w={'100%'}>
      <TabList>
        <Tab fontSize={'sm'} _selected={{ color: 'white', bg: 'gray.500' }}>
          Overview
        </Tab>
        <Tab fontSize={'sm'} _selected={{ color: 'white', bg: 'gray.500' }}>
          Attributes
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box mt="6">
            <Flex direction="column" gap="1" w="100%" mt="2">
              {NFT_INFO_ATTRIBUTES.map((item) => {
                return (
                  <Flex key={item.key} justifyContent={'space-between'} mt="1">
                    <Text mr="1">{t(item.label)}:</Text>
                    {item.isTruncate ? (
                      <MiddleTruncatedText
                        value={_.get(nft, item.key)}
                        startLength={4}
                        endLength={6}
                      />
                    ) : (
                      <Text>{_.get(nft, item.key)}</Text>
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </Box>
        </TabPanel>
        <TabPanel>
          <Flex
            direction={'column'}
            alignSelf={{ base: 'flex-start' }}
            w={{ base: '100%' }}
            mt={'6'}
          >
            <Text fontSize={'xl'} fontWeight={'bold'} mb={{ base: '2' }}>
              {t('attributes')}
            </Text>
            <Divider />
            <Flex flexWrap={'wrap'} mt="4" gap={{ base: '4' }}>
              {nft?.metadata &&
                nft?.metadata?.map((item) => (
                  <CardAttribute
                    key={`${item.key}-${item.value}`}
                    attribute={item.key || item.name}
                    value={item.value}
                  />
                ))}
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default NFTInfoTabs;
