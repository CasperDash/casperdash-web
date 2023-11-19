import { useEffect, useRef, useState } from 'react';

import { Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CiEdit } from 'react-icons/ci';
import { MdDone } from 'react-icons/md';

import InputNumber from '@/components/Inputs/InputNumber';
import TripleDotLoading from '@/components/Loading/TripleDotLoading';
import { AssetNamesEnum } from '@/enums/assetNames';
import { toCSPR, toMotes } from '@/utils/currency';

type Props = Omit<FlexProps, 'onChange'> & {
  value?: string | number;
  onChange?: (value: string) => void;
  isLoading?: boolean;
};

const EditInputField = ({
  value,
  onChange,
  isLoading,
  ...restProps
}: Props) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const handleOnEdit = () => {
    setIsEditing(true);
  };

  const handleOnDone = () => {
    if (!ref.current?.value || ref.current?.value === '') {
      setIsInvalid(true);

      return;
    }
    setIsEditing(false);
    onChange?.(toMotes(ref.current.value || 0).toString());
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.value = toCSPR(value || 0).toString();
    }
  }, [value]);

  return (
    <Flex alignItems={'center'} minH={14} {...restProps}>
      {isLoading && <TripleDotLoading />}
      {!isLoading && (
        <>
          {isEditing ? (
            <>
              <InputNumber
                defaultInputValue={toCSPR(value || 0)}
                value={value}
                ref={ref}
                minInputValue={1}
                isRequired
                isInvalid={isInvalid}
                errorBorderColor="red.300"
              />
              <Icon
                as={MdDone}
                ml="2"
                cursor="pointer"
                onClick={handleOnDone}
              />
            </>
          ) : (
            <>
              <Text ml="auto">
                {t('intlAssetNumber', {
                  asset: AssetNamesEnum.CSPR,
                  val: toCSPR(value || 0).toString(),
                })}
              </Text>
              <Icon
                as={CiEdit}
                ml="2"
                cursor="pointer"
                onClick={handleOnEdit}
              />
            </>
          )}
        </>
      )}
    </Flex>
  );
};

export default EditInputField;
