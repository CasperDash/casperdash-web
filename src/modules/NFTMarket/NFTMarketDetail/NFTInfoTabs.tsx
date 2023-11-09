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
import { IMarketNFT } from '@/services/casperdash/market/type';

type Props = {
  nft?: IMarketNFT;
};

const NFT_INFO_ATTRIBUTES = [
  {
    key: 'tokenPackageHash',
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
    <Tabs variant="soft-rounded" w={'100%'}>
      <TabList>
        <Tab fontSize={'sm'} _selected={{ color: 'white', bg: 'gray.400' }}>
          Overview
        </Tab>
        <Tab fontSize={'sm'} _selected={{ color: 'white', bg: 'gray.400' }}>
          Attributes
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box mt="6">
            <Text fontSize={'xl'} fontWeight={'bold'}>
              {t('description')}
            </Text>
            <Divider mt="2" />
            <Text mt="2">{nft?.description}</Text>
          </Box>
          <Box mt="6">
            <Text fontSize={'xl'} fontWeight={'bold'}>
              {t('details')}
            </Text>
            <Divider mt="2" />

            <Flex direction="column" gap="4" w="100%" mt="2">
              {NFT_INFO_ATTRIBUTES.map((item) => {
                return (
                  <Flex key={item.key} justifyContent={'space-between'} mt="4">
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
              {nft?.metadata?.map((attribute, index) => {
                return (
                  <CardAttribute
                    key={index}
                    attribute={attribute.key}
                    value={attribute.value}
                  />
                );
              })}
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default NFTInfoTabs;
