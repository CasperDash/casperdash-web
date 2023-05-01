import { Box, Divider, useColorModeValue } from '@chakra-ui/react';

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

const BaseLayout = ({
  children,
  defaultLightBg = 'gray.100',
  defaultLightHeaderBg = 'white',
}: Props) => {
  const bg = useColorModeValue(defaultLightBg, 'blackAlpha.900');
  const headerBg = useColorModeValue(defaultLightHeaderBg, 'blackAlpha.900');

  const { data: isLocked } = useGetLocked();

  return (
    <Box minHeight="100vh" bg={bg} pb="5">
      <Header bg={headerBg} />
      <Divider />
      <MainContainer>{!isLocked ? children : <UnlockWallet />}</MainContainer>
      <PopupAutoConnectWallet />
      <PopupSDK />
      <ButtonMagic />
    </Box>
  );
};

export default BaseLayout;
