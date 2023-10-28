import { Box, BoxProps, Flex } from '@chakra-ui/react';

import { useAccount } from '@/hooks/useAccount';
import ButtonConnectWallet from '@/modules/core/ButtonConnectWallet';
import MenuButtonModal from '@/modules/core/MenuButtonModal';

type HeaderProps = BoxProps;
const Header = ({ ...props }: HeaderProps) => {
  const { isConnected } = useAccount();

  return (
    <Box {...props} w="100%">
      <Flex py="7" px="10" justifyContent="flex-end">
        <Flex>
          {isConnected ? (
            <>
              <Box ml="3">
                <MenuButtonModal />
              </Box>
            </>
          ) : (
            <Box>
              <ButtonConnectWallet />
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
