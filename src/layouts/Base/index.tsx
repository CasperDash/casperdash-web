import { Box, Divider, useColorModeValue } from '@chakra-ui/react';

import Header from './Header';
import MainContainer from '@/components/Common/MainContainer';
import PopupAutoConnectWallet from '@/modules/PopupAutoConnectWallet';
import PopupSDK from '@/modules/PopupSDK';

export type Props = {
  children?: React.ReactNode;
  defaultLightHeaderBg?: string;
  defaultLightBg?: string;
};

const BaseLayout = ({
  children,
  defaultLightBg = 'gray.100',
  defaultLightHeaderBg = 'white',
}: Props) => {
  const bg = useColorModeValue(defaultLightBg, 'blackAlpha.900');
  const headerBg = useColorModeValue(defaultLightHeaderBg, 'blackAlpha.900');

  return (
    <Box minHeight="100vh" bg={bg}>
      <Header bg={headerBg} />
      <Divider />
      <MainContainer>{children}</MainContainer>
      <PopupAutoConnectWallet />
      <PopupSDK />
    </Box>
  );
};

export default BaseLayout;
