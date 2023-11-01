import { Box } from '@chakra-ui/react';

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
      <Box p={4} pr={2} w={'calc(92px + 32px)'}>
        <Sidebar />
      </Box>
      <Box p={4} pl={2} flex="1">
        <Header />
        <Box>
          <MainContainer>
            {children}
            <Box h={2000} bg={'teal'} />
          </MainContainer>
        </Box>
      </Box>

      {/* <SimpleSidebar>
        <p>Duc</p>
        {children}
      </SimpleSidebar> */}
    </BaseLayout>
  );
};

export default PanelLayout;
