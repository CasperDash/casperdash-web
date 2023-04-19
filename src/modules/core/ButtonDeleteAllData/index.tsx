import { useRef } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useDeleteAllData } from '@/hooks/useDeleteAllData';

export const ButtonDeleteAllData = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null!);
  const deleteAllData = useDeleteAllData();

  const handleDelete = () => {
    deleteAllData();
    close();
  };

  return (
    <>
      <Button
        leftIcon={<DeleteIcon />}
        p="6"
        w="100%"
        variant="ghost"
        borderRadius="xl"
        onClick={onOpen}
      >
        {t('delete_all_data')}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('are_you_sure_delete_all_data')}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('delete_all_data_description')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                {t('delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};