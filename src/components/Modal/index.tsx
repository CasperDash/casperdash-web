import { ReactNode } from 'react';

import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  ModalFooter,
  ModalContent,
} from '@chakra-ui/react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string | null;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  header,
  footer,
}: ModalProps) => {
  return (
    <>
      <ModalChakra isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" m={16} w={{ base: 'sm', md: 'xl' }}>
          <ModalHeader>
            {title && (
              <Heading
                variant={{
                  base: 'sm',
                  md: 'xl',
                }}
                textAlign={'center'}
              >
                {title}
              </Heading>
            )}
            {header}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;
