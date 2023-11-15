import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  HStack,
  Card,
  CardBody,
  Heading,
  Text,
  Icon,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import {
  BsFillCloudArrowDownFill,
  BsAndroid,
  BsApple,
  BsGooglePlay,
} from 'react-icons/bs';

import URLs from '@/config/URLs';

const InstallButton = ({ url }: { url: string }) => {
  return (
    <Popover closeOnBlur={false} trigger="hover">
      <PopoverTrigger>
        <Button
          w="space.5"
          background={'panelBackground'}
          shadow="panelShadow"
          size={'sm'}
          _hover={{
            background: 'red.500',
            color: 'white',
          }}
        >
          Install
        </Button>
      </PopoverTrigger>
      <PopoverContent width="184px" p={3}>
        <PopoverArrow />
        <PopoverBody p={0}>
          <Box textAlign="center">
            <Box ml="auto" mr="auto" mb={3}>
              <QRCodeSVG size={160} value={url} />
            </Box>
            <Text fontSize={'sm'}>Scan to download</Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const DownloadSocialButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
        icon={<BsFillCloudArrowDownFill />}
      />
      {/* <Icon boxSize={'36px'} as={BsFillCloudArrowDownFill} /> */}
      {/* </IconButton> */}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="1024px" p={50}>
          <ModalHeader mb={10} textAlign="center">
            <Heading size={'xl'} mb={4}>
              CasperDash Downloads
            </Heading>
            <Text
              maxW={'600px'}
              ml="auto"
              mr="auto"
              fontWeight={500}
              fontSize={'16px'}
            >
              Take your crypto journey to the next level, at home and on the go.
              Available on Browser Extension, Apple App Store, and Google Play
              Store.
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack columnGap={4} alignItems="flex-start">
              <Card background={'panelBackground'} shadow="panelShadow">
                <CardBody>
                  <HStack alignItems={'flex-start'} columnGap={3}>
                    <Box>
                      <Icon boxSize={'36px'} as={BsGooglePlay} mt="2" />
                    </Box>
                    <Box>
                      <Heading size="md" mb={2}>
                        Extension
                      </Heading>
                      <Text fontSize={'sm'} mb={4}>
                        Get the CasperDash wallet extension from the Chrome
                        store
                      </Text>
                      <Button
                        as={'a'}
                        href={URLs.extension}
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        w="space.5"
                        background={'panelBackground'}
                        shadow="panelShadow"
                        size={'sm'}
                        _hover={{
                          background: 'red.500',
                          color: 'white',
                        }}
                      >
                        Install
                      </Button>
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
              <Card background={'panelBackground'} shadow="panelShadow">
                <CardBody>
                  <HStack alignItems={'flex-start'} columnGap={3}>
                    <Box>
                      <Icon boxSize={'36px'} as={BsApple} mt="2" />
                    </Box>
                    <Box>
                      <Heading size="md" mb={2}>
                        Apple
                      </Heading>
                      <Text fontSize={'sm'} mb={4}>
                        Get the CasperDash wallet app from the Apple store
                      </Text>
                      <InstallButton url={URLs.appleStore} />
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
              <Card background={'panelBackground'} shadow="panelShadow">
                <CardBody>
                  <HStack alignItems={'flex-start'} columnGap={3}>
                    <Box>
                      <Icon boxSize={'36px'} as={BsAndroid} mt="2" />
                    </Box>
                    <Box>
                      <Heading size="md" mb={2}>
                        Android
                      </Heading>
                      <Text fontSize={'sm'} mb={4}>
                        Get the CasperDash wallet app from the Google Play.
                      </Text>
                      <InstallButton url={URLs.googlePlay} />
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DownloadSocialButton;
