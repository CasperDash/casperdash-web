import { useRef } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PathEnum } from '@/enums';
import { useAccount } from '@/hooks/useAccount';
import { PlusIcon } from '@/icons';
import colors from '@/theme/foundations/colors';
import { hexToRgba } from '@/utils/color';

export const ButtonMagic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const btnRef = useRef(null!);

  if (!isConnected) {
    return null;
  }

  const handleOnSend = () => {
    navigate(PathEnum.SEND);
    onClose();
  };

  const handleOnNfts = () => {
    navigate(PathEnum.NFT);
    onClose();
  };

  const handleOnStake = () => {
    navigate(PathEnum.STAKING);
    onClose();
  };

  const handleOnHome = () => {
    navigate(PathEnum.HOME);
    onClose();
  };

  return (
    <>
      <Button
        display={{ base: 'block', md: 'none' }}
        ref={btnRef}
        onClick={onOpen}
        position="fixed"
        bottom={24}
        right="8"
        variant="none"
        p="0"
        paddingInline={0}
        w="auto"
        boxShadow={`0px 3px 10px ${hexToRgba(colors.primary, 0.4)}}`}
      >
        <PlusIcon height="35px" width="35px" color={colors.primary} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
        variant="secondary"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody mt="4">
            <Divider />
            <Flex flexDirection="column" mt="4" gap="5">
              <Button w="100%" onClick={handleOnHome}>
                {t('home')}
              </Button>
              <Button w="100%" onClick={handleOnSend}>
                {t('send')}
              </Button>
              <Button w="100%" onClick={handleOnNfts}>
                {t('nfts')}
              </Button>
              <Button w="100%" onClick={handleOnStake}>
                {t('staking')}
              </Button>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
