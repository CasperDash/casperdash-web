import { Box, Flex, Spinner } from '@chakra-ui/react';
import { chakraComponents, SingleValueProps } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';

import SelectIcon, { Option } from '@/components/Select/SelectIcon';
import { useGetAssetOptions } from '@/hooks/queries/useGetAssetOptions';
import { useGetCurrentAccount } from '@/hooks/queries/useGetCurrentAccount';
import { WalletAccount } from '@/typings/walletAccount';

const SelectAssetField = () => {
  const { data: options } = useGetAssetOptions();
  const { setValue, control } = useFormContext();
  return (
    <Controller
      control={control}
      name="asset"
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <SelectIcon
          value={value}
          onChange={onChange}
          options={options || []}
          components={{
            SingleValue: ({ children, ...props }: SingleValueProps<Option>) => {
              const { data: account, isLoading } = useGetCurrentAccount({
                onSuccess: (data: WalletAccount) => {
                  setValue('maxAssetAmount', data?.balance);
                },
              });
              return (
                <chakraComponents.SingleValue {...props}>
                  <Flex alignItems="center">
                    <Box mr="2">{props.data.icon}</Box>
                    {children}
                    <Flex justifyContent="right" w="100%">
                      {isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Box>{account?.balance}</Box>
                      )}
                    </Flex>
                  </Flex>
                </chakraComponents.SingleValue>
              );
            },
          }}
        />
      )}
    />
  );
};

export default SelectAssetField;
