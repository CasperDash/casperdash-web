import { Box, Button, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ButtonReverse from './ButtonReverse';
import RadioPercentSelect from './RadioPercentSelect';
import SelectSwapFrom from './SelectSwapFrom';
import SelectSwapTo from './SelectSwapTo';
import Setting from './Setting';
import Paper from '@/components/Paper';
import CircleWrapper from '@/components/Surface/CircleWrapper';
import { RefreshIcon } from '@/icons';

const SwapForm = () => {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: {
      swapFrom: {},
      swapTo: {},
    },
  });

  const handleOnSubmit = () => {
    console.log('submit');
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
      <Paper mt="4" px="8" py="16">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
            <SelectSwapFrom />
            <Box mt="8">
              <RadioPercentSelect />
            </Box>
            <ButtonReverse />
            <SelectSwapTo />
            <Flex justify={'center'}>
              <Button
                variant="primary"
                type="submit"
                isDisabled={true}
                w="100%"
                mt="8"
              >
                {t('confirm')}
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default SwapForm;
