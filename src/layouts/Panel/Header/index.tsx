import { Box, BoxProps, Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BsSend } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import Logo from '@/components/Common/Logo';
import { PathEnum } from '@/enums';
import { useAccount } from '@/hooks/useAccount';
import AccountSidebar from '@/modules/core/AccountSidebar';
import ButtonConnectWallet from '@/modules/core/ButtonConnectWallet';
import ButtonViewReceivingAddress from '@/modules/core/ButtonViewReceivingAddress';
import MarketHeaderStats from '@/modules/core/MarketHeaderStats';
import MobileSidebar from '@/modules/core/MobileSidebar';

type HeaderProps = BoxProps;
const Header = ({ ...props }: HeaderProps) => {
  const { t } = useTranslation();
  const { isConnected } = useAccount();

  return (
    <Box
      {...props}
      w="100%"
      background={'panelBackground02'}
      shadow="panelShadow"
      borderRadius={'lg'}
      position={'sticky'}
      zIndex={5}
      top={4}
    >
      <Flex py="4" px="4" width="full">
        <Flex display={{ base: 'flex', sm: 'none' }} alignItems={'center'}>
          <Logo />
          <MobileSidebar />
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
          <MarketHeaderStats />
        </Flex>
        <Flex ml="auto" alignItems={'center'}>
          {isConnected ? (
            <Flex alignItems="center">
              <Flex
                gap="6"
                mr="6"
                display={{
                  base: 'none',
                  md: 'flex',
                }}
              >
                <Link to={PathEnum.SEND}>
                  <Button
                    background={'panelBackground'}
                    shadow="panelShadow"
                    _hover={{
                      bg: 'primary',
                      color: 'whiteAlpha.900',
                    }}
                    variant={'circle'}
                    w="42px"
                    h="42px"
                    px={0}
                    p={0}
                    fontSize={'18px'}
                  >
                    <BsSend />
                  </Button>
                  <Text mt="1" fontSize={'sm'} textAlign="center">
                    {t('send')}
                  </Text>
                </Link>

                <Box>
                  <ButtonViewReceivingAddress
                    variant={'circle'}
                    background={'panelBackground'}
                    shadow="panelShadow"
                    _hover={{
                      bg: 'primary',
                      color: 'whiteAlpha.900',
                    }}
                    w="42px"
                    h="42px"
                    px={0}
                    p={0}
                    fontSize={'18px'}
                  />
                  <Text mt="1" fontSize={'sm'} textAlign="center">
                    {t('receive')}
                  </Text>
                </Box>
              </Flex>
              <Box ml="3" h="100%">
                <AccountSidebar />
              </Box>
            </Flex>
          ) : (
            <ButtonConnectWallet />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
