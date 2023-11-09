import React from 'react';

import { Heading, Flex, Box } from '@chakra-ui/react';

import space from '@/theme/foundations/space';

interface NFTListingLayoutProps {
  title: string;
  filters: React.ReactNode;
  children: React.ReactNode;
}

const NFTListingLayout = (props: NFTListingLayoutProps) => {
  const { title, filters, children } = props;
  return (
    <Flex alignItems={'center'} flexDir={'column'} justify={'center'}>
      <Box mb={16} textAlign="left" marginRight={'auto'}>
        <Heading textAlign={'left'}>{title}</Heading>
      </Box>
      <Flex columnGap={space['6']}>
        <Flex width={'280px'} position="relative">
          <Box
            width="full"
            position={'sticky'}
            top={145}
            alignSelf={'flex-start'}
          >
            {filters}
          </Box>
        </Flex>
        <Flex>{children}</Flex>
      </Flex>
    </Flex>
  );
};

export default NFTListingLayout;
