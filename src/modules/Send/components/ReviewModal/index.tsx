import { Modal, ModalOverlay } from '@chakra-ui/react';

import ReviewModalContent from './ModalContent';
import { ReviewModalProps } from './type';

const ReviewModal = ({
  isOpen,
  onClose,
  onSend,
  values = {},
  isLoading = false,
}: ReviewModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ReviewModalContent
          onSubmit={onSend}
          isLoading={isLoading}
          values={values}
        />
      </Modal>
    </>
  );
};

export default ReviewModal;
