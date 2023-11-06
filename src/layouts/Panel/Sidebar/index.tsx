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
  Text,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiImage,
  FiPieChart,
} from 'react-icons/fi';
// import { Link } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';

// import Header from '../Header';
import Logo from '@/components/Common/Logo';
import { Config } from '@/config';
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
      minH="calc(100vh - 36px)"
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
        <Box mx="8" h="full">
          <Text pos={'absolute'} bottom="4" left="8" color="gray.500">
            Version {Config.appVersion}
          </Text>
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
      <Box mx="8" h="full">
        <Text pos={'absolute'} bottom="4" left="8" color="gray.500">
          Version {Config.appVersion}
        </Text>
      </Box>
    </Flex>
  );
};
