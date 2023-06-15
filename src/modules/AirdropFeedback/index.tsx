import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ModalFeedback from './ModalFeedback';
import { useGetAirdropCode } from '@/hooks/queries/useGetAirdropCode';
import { useAccount } from '@/hooks/useAccount';
import { AirdropStatusEnum } from '@/services/airdrop/user/type';

const AirdropFeedback = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isSuccess, isLoading } = useGetAirdropCode();
  const { isConnected } = useAccount();
  if (isLoading || !isSuccess || !isConnected) {
    return null;
  }

  if (data?.airdropStatus !== AirdropStatusEnum.STARTED) {
    return null;
  }

  return (
    <Flex position={'fixed'} right="10" bottom="10">
      <Button variant={'primary'} onClick={onOpen}>
        {t('give_feedback')}
      </Button>
      <ModalFeedback isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default AirdropFeedback;
