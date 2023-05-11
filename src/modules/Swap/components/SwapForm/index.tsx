import { Box, Button, Flex } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RadioPercentSelect from './RadioPercentSelect';
import SelectToken from './SelectToken';
import Paper from '@/components/Paper';
import { RefreshIcon, SettingIcon } from '@/icons';

const SwapForm = () => {
  const { t } = useTranslation();
  const methods = useForm();

  const handleOnSubmit = () => {
    console.log('submit');
  };

  return (
    <Box>
      <Box>
        <Flex>
          <SettingIcon />
          <RefreshIcon />
        </Flex>
      </Box>
      <Paper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
            <SelectToken />
            <RadioPercentSelect />
            <SelectToken />
            <Flex justify={'center'}>
              <Button
                variant="primary"
                type="submit"
                isDisabled={true}
                w="100%"
                mt="8"
              >
                {t('swap')}
              </Button>
            </Flex>
          </form>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default SwapForm;
