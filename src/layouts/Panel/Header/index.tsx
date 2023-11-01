import { Box, BoxProps, Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BsSend } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { PathEnum } from '@/enums';
import { useAccount } from '@/hooks/useAccount';
import ButtonConnectWallet from '@/modules/core/ButtonConnectWallet';
import ButtonViewReceivingAddress from '@/modules/core/ButtonViewReceivingAddress';
import MenuButtonModal from '@/modules/core/MenuButtonModal';

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
      <Flex py="6" px="10" justifyContent="flex-end">
        <Flex alignItems={'center'}>
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
                  <Button variant={'circle'} h="12">
                    <BsSend />
                  </Button>
                  <Text mt="1" fontSize={'sm'} textAlign="center">
                    {t('send')}
                  </Text>
                </Link>

                <Box>
                  <ButtonViewReceivingAddress variant={'circle'} h="12" />
                  <Text mt="1" fontSize={'sm'} textAlign="center">
                    {t('receive')}
                  </Text>
                </Box>
              </Flex>
              <Box ml="3" h="100%">
                <MenuButtonModal />
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
