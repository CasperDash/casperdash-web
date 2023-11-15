'use client';

import React, { ReactNode } from 'react';

import {
  Box,
  Flex,
  Icon,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiImage,
  FiPieChart,
} from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';

import DownloadSocialButton from '@/components/Common/DownloadSocialButton';
import Logo from '@/components/Common/Logo';
import { PathEnum } from '@/enums';
import { useAccount } from '@/hooks/useAccount';
import i18n from '@/i18n';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  isConnected?: boolean;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: i18n.t('home'), icon: FiHome, path: PathEnum.HOME },
  {
    name: i18n.t('staking'),
    icon: FiTrendingUp,
    path: PathEnum.STAKING,
    isConnected: true,
  },
  {
    name: i18n.t('portfolio'),
    icon: FiPieChart,
    path: PathEnum.PORTFOLIO,
    isConnected: true,
  },
  {
    name: i18n.t('my_nfts'),
    icon: FiImage,
    path: PathEnum.NFT,
    isConnected: true,
  },
  { name: i18n.t('market'), icon: FiCompass, path: PathEnum.NFT_MARKET },
];

export default function Sidebar() {
  const { onClose } = useDisclosure();
  return (
    <Flex
      className="sidebar"
      direction={'column'}
      minH="calc(100vh - 36px)"
      pos="sticky"
      top={4}
      zIndex={5}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', sm: 'flex' }}
      />
    </Flex>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isConnected } = useAccount();
  return (
    <Flex
      className="sidebar-content"
      direction="column"
      h="full"
      flex={1}
      {...rest}
    >
      <Flex
        position={'relative'}
        alignItems="center"
        mb={4}
        justifyContent="center"
      >
        <Logo />
      </Flex>
      <Flex
        direction="column"
        background={'panelBackground'}
        shadow="panelShadow"
        flex="1"
        justifyContent={'center'}
        borderRadius={'lg'}
      >
        {LinkItems.map((link) => {
          if (link.isConnected && !isConnected) {
            return null;
          }

          return (
            <NavItem
              key={link.name}
              icon={link.icon}
              path={link.path}
              onClick={onClose}
            >
              {link.name}
            </NavItem>
          );
        })}
        <Box mx="8" h="full">
          <Box
            pos={'absolute'}
            bottom="4"
            left="50%"
            transform={'translateX(-50%)'}
          >
            <DownloadSocialButton />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path: string;
  onClick: () => void;
}
const NavItem = ({ icon, children, path, onClick, ...rest }: NavItemProps) => {
  const location = useLocation();
  return (
    <Link
      as={ReactRouterLink}
      to={path}
      onClick={() => onClick?.()}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        direction={'column'}
        columnGap={4}
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transitionDuration={'200ms'}
        _hover={{
          color: 'primary',
        }}
        fontSize="sm"
        fontWeight={500}
        {...rest}
      >
        {icon && (
          <Flex
            transitionDuration={'200ms'}
            borderRadius={'lg'}
            alignItems={'center'}
            justifyContent={'center'}
            mb={'4px'}
            background={'panelBackground'}
            shadow="panelShadow"
            w={'56px'}
            h={'56px'}
            backgroundSize={'200% auto'}
            _hover={{
              backgroundPosition: 'right center',
            }}
          >
            <Icon
              filter={
                location.pathname === path
                  ? `drop-shadow(0 1px 15px #fa2852) drop-shadow(0 1px 17px #fa2852)`
                  : ``
              }
              fontSize="24"
              _groupHover={{
                color: 'primary',
              }}
              as={icon}
            />
          </Flex>
        )}
        {children}
      </Flex>
    </Link>
  );
};
