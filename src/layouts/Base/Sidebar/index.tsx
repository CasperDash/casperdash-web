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
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Logo from '@/components/Common/Logo';
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
  {
    name: i18n.t('my_nfts'),
    icon: FiImage,
    path: PathEnum.NFT,
    isConnected: true,
  },
  { name: i18n.t('staking'), icon: FiTrendingUp, path: PathEnum.STAKING },
  { name: i18n.t('market'), icon: FiCompass, path: PathEnum.NFT_MARKET },
];

type Props = {
  children: ReactNode;
};

export default function SimpleSidebar({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" w="100%" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
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
      <Header display={{ base: 'none', md: 'block' }} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isConnected } = useAccount();
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      shadow="sidebarShadow"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
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
    </Box>
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
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'light',
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
      <MenuButtonModal />
    </Flex>
  );
};
