import { Box, useColorModeValue } from '@chakra-ui/react';

import Header from './Header';
import MainContainer from '@/components/Common/MainContainer';

export type Props = {
  children?: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  const bg = useColorModeValue('gray.100', 'blackAlpha.900');

  return (
    <Box minHeight="100vh" bg={bg}>
      <Header />
      <MainContainer h="100vh">{children}</MainContainer>
    </Box>
  );
};

export default BaseLayout;
