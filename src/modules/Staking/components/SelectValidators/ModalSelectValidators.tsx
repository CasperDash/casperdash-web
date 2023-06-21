import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Heading,
  ModalFooter,
  Divider,
  ModalContent,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ModalSelectValidatorsBody from './ModalSelectValidatorsBody';
import { IValidator } from '@/hooks/queries/useGetValidators';

type Props = {
  isOpen: boolean;
  value?: string;
  onClose: () => void;
  onSelect?: (validator: IValidator) => void;
};

const ModalSelectValidators = ({ isOpen, onClose, onSelect, value }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        isCentered
        // motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl" w={{ base: 'sm', md: 'xl' }}>
          <ModalHeader>
            <Heading
              variant={{
                base: 'sm',
                md: 'xl',
              }}
              textAlign={'center'}
            >
              {t('search_validator')}
            </Heading>
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalSelectValidatorsBody onSelect={onSelect} value={value} />
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSelectValidators;
