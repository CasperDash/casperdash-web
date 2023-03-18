import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import CasperDashLogoImg from '@/assets/img/casperdash-logo.png';
import MainContainer from '@/components/Common/MainContainer';
import { PathEnum } from '@/enums/path';
import { BellIcon, MenuIcon } from '@/icons';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Box backgroundColor="white" w="100%">
      <MainContainer>
        <Flex py="6" justifyContent="space-between">
          <Flex alignItems="center">
            <Box>
              <Image
                src={CasperDashLogoImg}
                alt="logo"
                width="119"
                height="29.16"
              />
            </Box>
            <Box mx={8} w="2px" h="40px" backgroundColor="gray.200" />
            <Flex gap="16">
              <Link href={PathEnum.HOME}>{t('home')}</Link>
              <Link href={PathEnum.TRADE}>{t('trade')}</Link>
              <Link href={PathEnum.NFT}>{t('nfts')}</Link>
              <Link href={PathEnum.STAKING}>{t('staking')}</Link>
            </Flex>
          </Flex>
          <Flex>
            <Box mr="8" paddingTop="2">
              <BellIcon />
            </Box>
            <Button variant="light-outline">{t('connect_wallet')}</Button>
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
