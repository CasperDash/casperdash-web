import { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ButtonProps,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import ModalDetail from './ModalDetail';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import { ModalTransactionStatus } from '@/modules/core/ModalTransactionStatus';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';
import { DeployResponse } from '@/services/casperdash/deploy/type';
import { IMarketNFT } from '@/services/casperdash/market/type';

type Props = {
  nft?: IMarketNFT;
  royaltyFee?: number;
  isLoading?: boolean;
} & ButtonProps;

const BuyModalButton = ({ nft, isLoading, ...buttonProps }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onClose: onCloseTransaction,
  } = useDisclosure();
  const { t } = useTranslation();
  const [transactionHash, setTransactionHash] = useState<string>('');
  const queryClient = useQueryClient();

  const handleOnSuccessfulBuy = (deployResponse: DeployResponse) => {
    onClose();
    setTransactionHash(deployResponse.deployHash);
    onOpenTransaction();
  };

  const handleOnContinue = async () => {
    onCloseTransaction();
    setTransactionHash('');
    await queryClient.invalidateQueries([QueryKeysEnum.MARKET_NFTS]);
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={onOpen}
        fontWeight={'bold'}
        isLoading={isLoading}
      >
        {t('buy')}
      </Button>

      <UnlockWalletPopupRequired>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent pb="8">
            <ModalHeader>{t('confirm_buy')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ModalDetail
                tokenContractHash={nft?.tokenContractHash}
                tokenId={nft?.tokenId}
                name={nft?.metadata?.name}
                listingAmount={nft?.listingAmount}
                image={nft?.image}
                onSuccessfulBuy={handleOnSuccessfulBuy}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </UnlockWalletPopupRequired>
      <ModalTransactionStatus
        transactionHash={transactionHash}
        isOpen={isOpenTransaction}
        onClose={handleOnContinue}
      />
    </>
  );
};

export default BuyModalButton;