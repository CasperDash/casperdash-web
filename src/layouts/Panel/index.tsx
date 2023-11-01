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
      <Box p={4}>
        <Sidebar />
      </Box>
      <Box p={4} flex="1" bg="tomato">
        <Header />
        <Box>
          <MainContainer>{children}</MainContainer>
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
