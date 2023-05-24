import { Box, Divider, Flex, useDisclosure } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import ButtonReverse from './ButtonReverse';
import { ButtonSwap } from './ButtonSwap';
import ModalConfirm from './ModalConfirm';
import RadioPercentSelect from './RadioPercentSelect';
import Receipt from './Receipt';
import SelectSwapFrom from './SelectSwapFrom';
import SelectSwapTo from './SelectSwapTo';
import Setting from './Setting';
import Paper from '@/components/Paper';
import CircleWrapper from '@/components/Surface/CircleWrapper';
import { RefreshIcon } from '@/icons';
import UnlockWalletPopupRequired from '@/modules/core/UnlockWalletPopupRequired';
import { FieldValues } from '@/modules/Swap/type';

const SwapForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm<FieldValues>({
    defaultValues: {
      swapFrom: {},
      swapTo: {},
      swapSettings: {
        slippage: 0,
        deadline: 0,
      },
      pair: {},
    },
  });

  const handleOnSubmit = () => {
    onOpen();
  };

  return (
    <Box>
      <Box mt="5">
        <Flex justifyContent={'center'} alignItems="center" gap="4">
          <Setting />
          <CircleWrapper
            backgroundColor={'gray.200'}
            p="5px"
            size={10}
            cursor="pointer"
            _hover={{ color: 'light' }}
          >
            <Box ml="1.2px" mt="1.7px">
              <RefreshIcon width="24px" height="20px" />
            </Box>
          </CircleWrapper>
        </Flex>
      </Box>
      <Paper mt="4" px="8" py="8">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
            <SelectSwapFrom />
            <Box mt="8">
              <RadioPercentSelect />
            </Box>
            <ButtonReverse />
            <SelectSwapTo />
            <Flex justify={'center'} mt="8">
              <ButtonSwap />
            </Flex>
            <Divider mt="6" w="100%" />
            <Receipt px="10" py="4" isShowRoute />
          </form>
          <UnlockWalletPopupRequired>
            <ModalConfirm isOpen={isOpen} onClose={onClose} />
          </UnlockWalletPopupRequired>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default SwapForm;
