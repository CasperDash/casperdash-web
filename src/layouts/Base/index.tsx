import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import BackgroundAutoConnectWallet from '@/modules/BackgroundAutoConnectWallet';
import PopupAirdrop from '@/modules/PopupAirdrop';
import PopupSDK from '@/modules/PopupSDK';

export type Props = {
  children?: React.ReactNode;
  defaultLightHeaderBg?: string;
  defaultLightBg?: string;
};

const BodyContent = ({ children }: { children: React.ReactNode }) => {
  return <Flex className="body-content">{children}</Flex>;
};

const BaseLayout = ({ children, defaultLightBg = 'gray.100' }: Props) => {
  const bg = useColorModeValue(defaultLightBg, 'blackAlpha.900');

  return (
    <Box
      className="base-layout"
      minHeight="100vh"
      bg={bg}
      position={'relative'}
    >
      <BodyContent>{children}</BodyContent>
      <PopupSDK />
      <BackgroundAutoConnectWallet />
      <PopupAirdrop />
    </Box>
  );
};

export default BaseLayout;
