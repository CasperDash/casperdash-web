import {
  Button,
  Box,
  Text,
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubmitValues } from './formAttributes';
import ReceiveWidget from './ReceiveWidget';
import { useGetCurrentNFT } from '../../hooks/useGetCurrentNFT';
import InputNumber from '@/components/Inputs/InputNumber';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';

type Props = {
  onList: () => void;
};

const ModalContentHandler = ({ onList }: Props) => {
  const { t } = useTranslation();
  const { toastError } = useI18nToast();
  const methods = useFormContext<SubmitValues>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const { nft } = useGetCurrentNFT();

  const onSubmit = () => {
    if (!nft) {
      toastError('nft_not_found');
      return;
    }

    onList();
  };

  return (
    <>
      <Box mt="8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.price} mt="4">
            <FormLabel>
              <Text fontWeight="bold" mb="4">
                {t('price')} (CSPR)
              </Text>
            </FormLabel>
            <InputNumber
              {...register('price', { valueAsNumber: true })}
              mt="2"
            />
            {!!errors.price && (
              <FormErrorMessage>
                {_.get(errors, 'price.message', t('default_error_message'))}
              </FormErrorMessage>
            )}
          </FormControl>
          <ReceiveWidget />
          <Flex mt="8">
            <Button variant="primary" mr={3} type="submit" w="100%">
              {t('list')}
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default ModalContentHandler;
