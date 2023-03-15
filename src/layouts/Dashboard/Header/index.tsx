import { Box, Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import MainContainer from '@/components/MainContainer';
import { PathEnum } from '@/enums/path';
import { BellIcon, MenuIcon } from '@/icons';
import CasperDashLogoImg from '~/public/img/casperdash-logo.png';

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
            <Button variant="light">{t('connect_wallet')}</Button>
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
