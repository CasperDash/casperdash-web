import { useDisclosure } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import {
  IconButton,
  Text,
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Icon,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Link as ReactRouterLink } from 'react-router-dom';

import ButtonMenuItem from '@/components/Common/ButtonMenuItem';
import { useAccount } from '@/hooks/useAccount';
import { LinkItems } from '@/layouts/Panel/Sidebar';

const MobileSidebar = () => {
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Flex justifyContent={'center'} alignItems="center" gap="4">
        <IconButton
          isRound={true}
          variant="solid"
          aria-label="Done"
          w="56px"
          h="56px"
          fontSize="24px"
          background={'panelBackground'}
          shadow="panelShadow"
          onClick={onOpen}
          icon={<FiMenu />}
        />
      </Flex>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody pt={4} pb={4}>
            <Flex rowGap={2} direction={'column'} height="full">
              {LinkItems.map((link) => {
                if (link.isConnected && !isConnected) {
                  return null;
                }

                return (
                  <Link
                    key={link.name}
                    as={ReactRouterLink}
                    to={link.path}
                    style={{ textDecoration: 'none' }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    <ButtonMenuItem
                      leftIcon={<Icon as={link.icon} boxSize={'16px'} />}
                    >
                      <Text ml="1">{link.name}</Text>
                    </ButtonMenuItem>
                  </Link>
                );
              })}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MobileSidebar;
