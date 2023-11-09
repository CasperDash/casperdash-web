import { useState } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { AccountManagement } from './components/AccountManagement';
import { CreateAccountForm } from './components/CreateAccountForm';
import { ImportAccountForm } from './components/ImportAccountForm';
import { ViewPrivateKey } from './components/ViewPrivateKey';
import { TypesEnum } from './enum';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalAccounts = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const [currentType, setCurrentType] = useState<TypesEnum>(
    TypesEnum.ACCOUNT_MANAGEMENT
  );

  const handleOnChangeType = (type: TypesEnum) => {
    setCurrentType(type);
  };

  const handleOnBack = () => {
    setCurrentType(TypesEnum.ACCOUNT_MANAGEMENT);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={{ base: 'sm', md: 'xl' }}>
          <ModalHeader textAlign="center">
            {
              {
                [TypesEnum.ACCOUNT_MANAGEMENT]: (
                  <Heading variant="xl">{t('accounts')}</Heading>
                ),
                [TypesEnum.CREATE_ACCOUNT]: (
                  <Flex alignItems="center">
                    <ArrowBackIcon
                      cursor="pointer"
                      onClick={handleOnBack}
                      mr="2"
                    />
                    <Heading variant="xl">{t('create_account')}</Heading>
                  </Flex>
                ),
                [TypesEnum.IMPORT_ACCOUNT]: (
                  <Flex alignItems="center">
                    <ArrowBackIcon
                      cursor="pointer"
                      onClick={handleOnBack}
                      mr="2"
                    />
                    <Heading variant="xl">{t('import_account')}</Heading>
                  </Flex>
                ),
                [TypesEnum.VIEW_PRIVATE_KEY]: (
                  <Flex alignItems="center">
                    <ArrowBackIcon
                      cursor="pointer"
                      onClick={handleOnBack}
                      mr="2"
                    />
                    <Heading variant="xl">{t('view_private_key')}</Heading>
                  </Flex>
                ),
              }[currentType]
            }
          </ModalHeader>
          <Divider mt="4" />
          <ModalCloseButton />
          <ModalBody p="6">
            {
              {
                [TypesEnum.ACCOUNT_MANAGEMENT]: (
                  <AccountManagement
                    onClose={onClose}
                    onChangeType={handleOnChangeType}
                  />
                ),
                [TypesEnum.CREATE_ACCOUNT]: (
                  <CreateAccountForm onSuccess={handleOnBack} />
                ),
                [TypesEnum.IMPORT_ACCOUNT]: (
                  <ImportAccountForm onSuccess={handleOnBack} />
                ),
                [TypesEnum.VIEW_PRIVATE_KEY]: <ViewPrivateKey />,
              }[currentType]
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
