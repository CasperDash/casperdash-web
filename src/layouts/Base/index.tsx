import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { useGetLocked } from '@/hooks/queries/useGetLocked';
import PopupAutoConnectWallet from '@/modules/PopupAutoConnectWallet';
import PopupSDK from '@/modules/PopupSDK';
import UnlockWallet from '@/modules/UnlockWallet';

export type Props = {
  children?: React.ReactNode;
  defaultLightHeaderBg?: string;
  defaultLightBg?: string;
};

const BodyContent = ({ children }: { children: React.ReactNode }) => {
  const { data: isLocked, isLoading } = useGetLocked();

  if (isLoading) {
    return <Flex h="100vh"></Flex>;
  }

  return (
    <Flex className="body-content">
      {!isLocked ? children : <UnlockWallet />}
    </Flex>
  );
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
      <PopupAutoConnectWallet />
      <PopupSDK />
    </Box>
  );
};

export default BaseLayout;
