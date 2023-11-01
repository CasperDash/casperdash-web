'use client';

import React, { ReactNode } from 'react';

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiImage,
  FiPieChart,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

// import Header from '../Header';
import Logo from '@/components/Common/Logo';
// import MainContainer from '@/components/Common/MainContainer';
import { PathEnum } from '@/enums';
import { useAccount } from '@/hooks/useAccount';
import i18n from '@/i18n';
import MenuButtonModal from '@/modules/core/MenuButtonModal';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  isConnected?: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: i18n.t('home'), icon: FiHome, path: PathEnum.HOME },
  { name: i18n.t('staking'), icon: FiTrendingUp, path: PathEnum.STAKING },
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      className="sidebar"
      direction={'column'}
      minH="100vh"
      pos="sticky"
      top={4}
      zIndex={5}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'flex' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      {/* <Header display={{ base: 'none', md: 'block' }} /> */}
      {/* <Flex ml={{ base: 0, md: 60 }}>
        <p>Flex</p>
        <MainContainer>{children}</MainContainer>
      </Flex> */}
    </Flex>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isConnected } = useAccount();
  return (
    <Flex className="xxx" direction="column" h="full" flex={1} {...rest}>
      <Flex alignItems="center" mb={4} justifyContent="center">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
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
  return (
    <Link to={path} onClick={() => onClick?.()}>
      <Box
        as="a"
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          direction={'column'}
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'primary',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}
    >
      <Flex flex="1" alignItems={'center'}>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Box ml="4">
          <Logo />
        </Box>
      </Flex>
      <p>XXX</p>
      <MenuButtonModal />
    </Flex>
  );
};
