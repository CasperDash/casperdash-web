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
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useDeleteAllData } from '@/hooks/useDeleteAllData';

export const ButtonDeleteAllData = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const cancelRef = useRef(null!);
  const deleteAllData = useDeleteAllData();

  const handleDelete = () => {
    deleteAllData();
    onClose();
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
        justifyContent="flex-start"
        colorScheme="red"
      >
        <Text ml="1">{t('delete_all_data')}</Text>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size={{ base: 'xs', md: 'xl' }}
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
