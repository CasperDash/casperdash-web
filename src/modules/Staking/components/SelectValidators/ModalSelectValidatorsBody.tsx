import { useMemo, useState } from 'react';

import {
  ModalBody,
  Box,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';

import ListValidators from './ListValidators';
import { useGetDelegation } from '@/hooks/queries/useGetDelegation';
import { IValidator, useGetValidators } from '@/hooks/queries/useGetValidators';
import { useAccount } from '@/hooks/useAccount';

type Props = {
  value?: string;
  onSelect?: (validator: IValidator) => void;
};

const ModalSelectValidatorsBody = ({ onSelect, value }: Props) => {
  const { t } = useTranslation();
  const { publicKey } = useAccount();
  const [name, setName] = useState('');
  const { data: validators = [], isLoading } = useGetValidators(name);
  const { data: listStakeds = [], isLoading: isLoadingDelegation } =
    useGetDelegation(publicKey);

  const handleOnChangeInput = _.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      setName(inputValue);
    },
    200
  );

  const isFirstLoading = (isLoading || isLoadingDelegation) && name === '';

  const normalizedValidators = useMemo(() => {
    const listStaked = listStakeds.map((item) => item.validatorPublicKey);

    return validators.map((item) => ({
      ...item,
      isStaked: listStaked.includes(item.validatorPublicKey),
    }));
  }, [listStakeds, validators]);

  return (
    <ModalBody>
      <Box>
        <FormControl>
          <FormLabel>{t('name')}</FormLabel>
          <Input
            onChange={handleOnChangeInput}
            disabled={isFirstLoading}
            defaultValue={name}
          />
        </FormControl>
      </Box>
      <ListValidators
        validators={normalizedValidators}
        isLoading={isFirstLoading}
        onSelect={onSelect}
        selectedAddress={value}
      />
    </ModalBody>
  );
};

export default ModalSelectValidatorsBody;
