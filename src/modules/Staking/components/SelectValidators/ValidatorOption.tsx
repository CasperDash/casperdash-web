import React from 'react';

import { chakraComponents, OptionProps } from 'chakra-react-select';

import ValidatorItem from '../ValidatorItem';
import { IValidator } from '@/hooks/queries/useGetValidators';

const { Option } = chakraComponents;

export const ValidatorOption = (props: OptionProps<IValidator>) => {
  const { data, innerProps } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = innerProps;
  const newProps = { ...props, innerProps: rest };

  return (
    <Option {...newProps}>
      <ValidatorItem {...data} showPriority />
    </Option>
  );
};
