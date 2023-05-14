import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  ModalFooter,
  Divider,
  ModalContent,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import CircleWrapper from '@/components/Surface/CircleWrapper';
import { SearchIcon } from '@/icons';

type ModalReceivingAddressProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSelectToken = ({ isOpen, onClose }: ModalReceivingAddressProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" m={10} w={{ base: 'sm', md: 'xl' }}>
          <ModalHeader>
            <Heading
              variant={{
                base: 'sm',
                md: 'xl',
              }}
              textAlign={'center'}
            >
              {t('search_token')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Flex
              h="14"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="2xl"
              alignItems={'center'}
            >
              <Flex ml="4">
                <SearchIcon />
              </Flex>
              <Input
                ml="3"
                variant="unstyled"
                border={'none'}
                placeholder={t('search_token') || ''}
              />
            </Flex>
            <Text color={'gray.500'} mt="8">
              {t('token_list')}
            </Text>
            <Flex direction={'column'} mt="6">
              <Flex
                cursor="pointer"
                _hover={{ color: 'light' }}
                alignItems={'center'}
                justify="space-between"
                w="100%"
              >
                <Flex alignItems={'center'}>
                  <CircleWrapper />
                  <Text ml="3">CSPR</Text>
                </Flex>
                <Text mr="4">0</Text>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSelectToken;
