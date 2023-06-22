import React from 'react';

import { chakraComponents, SingleValueProps } from 'chakra-react-select';

import ValidatorItem from '../ValidatorItem';
import { IValidator } from '@/hooks/queries/useGetValidators';

const { SingleValue } = chakraComponents;

export const ValidatorValue = (props: SingleValueProps<IValidator>) => {
  const { data } = props;
  return (
    <SingleValue {...props}>
      <ValidatorItem {...data} />
    </SingleValue>
  );
};
