import { Box, Divider, Flex, useColorModeValue } from '@chakra-ui/react';

import Header from './Header';
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
    return <Flex h="100vh" justifyContent={'center'}></Flex>;
  }

  return (
    <MainContainer>{!isLocked ? children : <UnlockWallet />}</MainContainer>
  );
};

const BaseLayout = ({
  children,
  defaultLightBg = 'gray.100',
  defaultLightHeaderBg = 'white',
}: Props) => {
  const bg = useColorModeValue(defaultLightBg, 'blackAlpha.900');
  const headerBg = useColorModeValue(defaultLightHeaderBg, 'blackAlpha.900');

  return (
    <Box minHeight="100vh" bg={bg} pb="5">
      <Header bg={headerBg} />
      <Divider />
      <BodyContent>{children}</BodyContent>
      <PopupAutoConnectWallet />
      <PopupSDK />
      <ButtonMagic />
    </Box>
  );
};

export default BaseLayout;
