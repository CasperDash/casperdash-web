import { Flex, Box } from '@chakra-ui/react';

import Header from './Header';
import Sidebar from './Sidebar';
import BaseLayout from '../Base';
import MainContainer from '@/components/Common/MainContainer';

export type Props = {
  children?: React.ReactNode;
  defaultLightBg?: string;
};

// MasterPanelLayout
const PanelLayout = ({ children }: Props) => {
  return (
    <BaseLayout defaultLightBg="white" defaultLightHeaderBg="gray.50">
      <Box
        className="primary--sidebar"
        display={{ base: 'none', sm: 'block' }}
        p={4}
        pr={2}
        w={'calc(92px + 32px)'}
      >
        <Sidebar />
      </Box>
      <Flex
        className="primary--body"
        direction={'column'}
        rowGap={4}
        p={4}
        pl={2}
        flex="1"
      >
        <Header className="master--header" />
        <Box
          className="master--body"
          background={'panelBackground02'}
          shadow="panelShadow"
          borderRadius={'lg'}
        >
          <MainContainer>
            {children}
            {/* <Box h={2000} bg={'teal'} /> */}
          </MainContainer>
        </Box>
      </Flex>
    </BaseLayout>
  );
};

export default PanelLayout;
