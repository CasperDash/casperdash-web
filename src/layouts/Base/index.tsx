import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import SimpleSidebar from './Sidebar';
import MainContainer from '@/components/Common/MainContainer';
import { useGetLocked } from '@/hooks/queries/useGetLocked';
import { ButtonMagic } from '@/modules/core/ButtonMagic';
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
    <MainContainer>{!isLocked ? children : <UnlockWallet />}</MainContainer>
  );
};

const BaseLayout = ({ children, defaultLightBg = 'gray.100' }: Props) => {
  const bg = useColorModeValue(defaultLightBg, 'blackAlpha.900');

  return (
    <Flex minHeight="100vh" bg={bg} pb="5" position={'relative'}>
      <SimpleSidebar>
        <Box>
          <BodyContent>{children}</BodyContent>
          <PopupAutoConnectWallet />
          <PopupSDK />
          <ButtonMagic />
        </Box>
      </SimpleSidebar>
    </Flex>
  );
};

export default BaseLayout;
