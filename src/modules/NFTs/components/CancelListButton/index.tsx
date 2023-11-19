import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ModalContentHandler from './ModalContentHandler';
import { useGetPendingActionTransaction } from '../../hooks/useGetPendingActionTransaction';
import { DeployActionsEnum } from '@/enums/deployActions';
import { ModalTransactionStatus } from '@/modules/core/ModalTransactionStatus';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';

type Props = {
  contractAddress: string;
  tokenId: string;
  onContinue?: () => void;
};

const CancelListButton = ({ contractAddress, tokenId, onContinue }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isPending, isLoading, transaction } = useGetPendingActionTransaction({
    tokenAddress: contractAddress,
    tokenId,
    action: DeployActionsEnum.CANCEL_LIST_ITEM,
  });
  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onClose: onCloseTransaction,
  } = useDisclosure();

  const handleOnCancel = () => {
    onOpen();
  };

  const handleOnContinue = () => {
    onCloseTransaction();
    onContinue?.();
  };

  return (
    <>
      <Button
        variant="light-outline"
        mt="4"
        w="100%"
        onClick={handleOnCancel}
        fontWeight={'bold'}
        isLoading={isLoading || isPending}
        loadingText={isPending && t('deploying')}
      >
        {t('cancel_listing')}
      </Button>
      <UnlockWalletPopupRequired>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent pb="8">
            <ModalHeader textAlign={'center'}>
              {t('cancel_listing')}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ModalContentHandler
                contractAddress={contractAddress}
                tokenId={tokenId}
                onClose={onClose}
                onOpenTransaction={onOpenTransaction}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </UnlockWalletPopupRequired>
      <ModalTransactionStatus
        transactionHash={transaction?.deployHash}
        isOpen={isOpenTransaction}
        onClose={handleOnContinue}
      />
    </>
  );
};

export default CancelListButton;
