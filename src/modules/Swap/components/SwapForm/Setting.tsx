import { Box, useDisclosure } from '@chakra-ui/react';

import ModalTransactionSetting from '../ModalTransactionSetting';
import CircleWrapper from '@/components/Surface/CircleWrapper';
import { SettingIcon } from '@/icons';

const Setting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CircleWrapper
        backgroundColor={'gray.200'}
        p="7px"
        size={10}
        cursor="pointer"
        _hover={{ color: 'light' }}
        onClick={onOpen}
      >
        <Box mt="1px">
          <SettingIcon width="24px" height="20px" />
        </Box>
      </CircleWrapper>
      <ModalTransactionSetting isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Setting;
