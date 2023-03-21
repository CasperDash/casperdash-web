import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import CasperDashLogoImg from '@/assets/img/casperdash-logo.png';
import MainContainer from '@/components/Common/MainContainer';
import { PathEnum } from '@/enums/path';
import { BellIcon, MenuIcon } from '@/icons';
import ButtonConnectWallet from '@/modules/core/ButtonConnectWallet';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Box backgroundColor="white" w="100%">
      <MainContainer>
        <Flex py="7" justifyContent="space-between">
          <Flex alignItems="center">
            <Box>
              <Link to={PathEnum.HOME}>
                <Image
                  src={CasperDashLogoImg}
                  alt="logo"
                  width="119"
                  height="29.16"
                />
              </Link>
            </Box>
            <Box mx={8} w="2px" h="40px" backgroundColor="gray.200" />
            <Flex gap="16">
              <Link to={PathEnum.HOME}>{t('home')}</Link>
              <Link to={PathEnum.TRADE}>{t('trade')}</Link>
              <Link to={PathEnum.NFT}>{t('nfts')}</Link>
              <Link to={PathEnum.STAKING}>{t('staking')}</Link>
            </Flex>
          </Flex>
          <Flex>
            <Box mr="8" paddingTop="2">
              <BellIcon />
            </Box>
            <ButtonConnectWallet />
            <Box ml="3">
              <Button variant="circle">
                <MenuIcon />
              </Button>
            </Box>
          </Flex>
        </Flex>
      </MainContainer>
    </Box>
  );
};

export default Header;
