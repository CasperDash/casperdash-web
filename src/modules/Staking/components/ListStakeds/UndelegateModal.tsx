import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  ModalFooter,
  Divider,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Big from 'big.js';
import * as _ from 'lodash-es';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ValidatorItem from '../ValidatorItem';
import InputNumber from '@/components/Inputs/InputNumber';
import { IValidator } from '@/hooks/queries/useGetValidators';

type SubmitValues = {
  amount: number;
};

type ModalUndelegateProps = {
  max?: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (values: SubmitValues) => void;
  validator: IValidator;
};

const UndelegateModal = ({
  max = 0,
  isOpen,
  onClose,
  onConfirm,
  validator,
}: ModalUndelegateProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = (submitValues: SubmitValues) => {
    onConfirm?.(submitValues);
  };

  const handleOnClickMax = () => {
    setValue('amount', Big(max).toNumber());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="2xl" w={{ base: 'sm', md: 'xl' }}>
        <ModalHeader>
          <Heading textAlign="center" variant="xl">
            {t('undelegate')}
          </Heading>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex mt="9" direction="column" justifyContent="center">
              <FormControl isInvalid={!!errors.amount}>
                <FormLabel>
                  <Text fontWeight="bold" mb="4">
                    {t('amount')}
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputNumber
                    {...register('amount', {
                      required: t('amount_required') as string,
                      max: {
                        value: max || 100000000000,
                        message: t('amount_too_big'), // Amount too big
                      },
                      min: {
                        value: 0.000000001,
                        message: t('amount_too_small'),
                      },
                    })}
                  />
                  <InputRightElement pr="2" w="16">
                    <Flex alignItems={'center'}>
                      <Button
                        minW="14"
                        size={'xs'}
                        mt="2"
                        onClick={handleOnClickMax}
                      >
                        {t('max')}
                      </Button>
                    </Flex>
                  </InputRightElement>
                </InputGroup>
                {!!errors.amount && (
                  <FormErrorMessage>
                    {_.get(errors, 'amount.message', 'default_error_message')}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Box borderRadius="xl" mt="8" bg="gray.100" px="8" py="5">
                <ValidatorItem {...validator} px="2" />
              </Box>
            </Flex>
            <Box mt="10">
              <Button type="submit" w="100%" variant="primary">
                {t('confirm')}
              </Button>
            </Box>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UndelegateModal;
