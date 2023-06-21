/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  AbsoluteCenter,
  Box,
  Flex,
  Icon,
  SelectProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import ModalSelectValidators from './ModalSelectValidators';
import ValidatorItem from '../ValidatorItem';
import { IValidator } from '@/hooks/queries/useGetValidators';

export type Props = {
  onSelect?: (newValue?: any) => void;
  value?: IValidator;
} & Pick<SelectProps, 'mt'>;

const SelectValidators = ({ onSelect, value, ...restProps }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        px="4"
        py="4"
        cursor="pointer"
        position={'relative'}
        alignItems="center"
        onClick={onOpen}
        minH="70px"
        {...restProps}
      >
        <Box flex="1" mr="10">
          {value ? (
            <ValidatorItem {...value} showPriority />
          ) : (
            <Text>{t('select_a_validator')}</Text>
          )}
        </Box>
        <AbsoluteCenter right="2" axis="vertical">
          <Icon as={ChevronDownIcon} w="10" boxSize="6" />
        </AbsoluteCenter>
      </Flex>
      <ModalSelectValidators
        isOpen={isOpen}
        onClose={onClose}
        onSelect={(validator) => {
          onSelect?.(validator);
          onClose();
        }}
        value={value?.validatorPublicKey}
      />
    </>
  );
};

export default SelectValidators;
