import { AddIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as _ from 'lodash-es';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useMutateAddMyToken } from '@/hooks/mutates/useMutateAddMyToken';
import { useGetToken } from '@/hooks/queries/useGetToken';
import { GetTokenResponse } from '@/services/casperdash/token';
import { Token } from '@/typings/token';

type TokenFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const tokenSchema = z.object({
  tokenAddress: z.string().nonempty('token_address_required'),
  name: z.string().nonempty('name_required'),
  symbol: z.string().nonempty('symbol_required'),
  decimals: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0, 'decimals_required'),
});

export type SubmitValues = z.infer<typeof tokenSchema>;

const TokenFormModal = ({ isOpen, onClose }: TokenFormProps) => {
  const { t } = useTranslation();
  const { toastSuccess } = useI18nToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      tokenAddress: '',
      name: '',
      symbol: '',
      decimals: 0,
    },
  });
  const tokenAddressTracked = useWatch({
    control,
    name: 'tokenAddress',
  });
  const { isFetching: isFetchingToken } = useGetToken(
    {
      tokenAddress: tokenAddressTracked,
    },
    {
      onSuccess: (tokenResponse: GetTokenResponse) => {
        if (tokenResponse) {
          setValue('name', tokenResponse.name);
          setValue('symbol', tokenResponse.symbol);
        }
      },
    }
  );

  const { mutate } = useMutateAddMyToken({
    onSuccess: (tokenAdded: Token) => {
      toastSuccess('token_added', { name: tokenAdded.name });
      onClose();
    },
  });

  const onSubmit = (values: SubmitValues) => {
    mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading variant="xl" textAlign="center">
            {t('add_your_token')}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.tokenAddress}>
              <FormLabel>
                <Text fontWeight="bold" mb="4">
                  {t('token_address')}
                </Text>
              </FormLabel>
              <InputGroup>
                <Input
                  {...register('tokenAddress', {
                    required: 'token_address_required',
                  })}
                />
                {isFetchingToken && (
                  <InputRightElement
                    display={'flex'}
                    alignItems={'center'}
                    mt="1"
                  >
                    <Spinner size="xs" />
                  </InputRightElement>
                )}
              </InputGroup>
              {!!errors.tokenAddress && (
                <FormErrorMessage>
                  {t(
                    _.get(
                      errors,
                      'tokenAddress.message',
                      'default_error_message'
                    )
                  )}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt="4" isInvalid={!!errors.name}>
              <FormLabel>
                <Text fontWeight="bold" mb="4">
                  {t('name')}
                </Text>
              </FormLabel>
              <Input
                {...register('name', {
                  required: 'name_required',
                })}
              />
              {!!errors.name && (
                <FormErrorMessage>
                  {t(_.get(errors, 'name.message', 'default_error_message'))}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt="4" isInvalid={!!errors.symbol}>
              <FormLabel>
                <Text fontWeight="bold" mb="4">
                  {t('symbol')}
                </Text>
              </FormLabel>
              <Input
                {...register('symbol', {
                  required: 'symbol_required',
                })}
              />
              {!!errors.symbol && (
                <FormErrorMessage>
                  {t(_.get(errors, 'symbol.message', 'default_error_message'))}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt="4" isInvalid={!!errors.decimals}>
              <FormLabel>
                <Text fontWeight="bold" mb="4">
                  {t('decimals')}
                </Text>
              </FormLabel>
              <Input type="number" {...register('decimals')} />
              {!!errors.decimals && (
                <FormErrorMessage>
                  {t(
                    _.get(errors, 'decimals.message', 'default_error_message')
                  )}
                </FormErrorMessage>
              )}
            </FormControl>
            <Flex justifyContent={'center'} mt="6" mb="4">
              <Button
                type="submit"
                variant={'primary'}
                w="60%"
                leftIcon={<SmallAddIcon />}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {t('add')}
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const TableTokenHeader = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Text color="gray.500" fontSize="xl">
        {t('my_tokens')}
      </Text>
      <Box>
        <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onOpen}>
          {t('add_token')}
        </Button>
        <TokenFormModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  );
};

export default TableTokenHeader;
