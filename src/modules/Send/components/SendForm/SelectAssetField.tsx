import { Box, Flex, Spinner } from '@chakra-ui/react';
import { chakraComponents, SingleValueProps } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import SelectIcon from '@/components/Select/SelectIcon';
import {
  AssetOption,
  useGetAssetOptions,
} from '@/hooks/queries/useGetAssetOptions';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { WalletAccountBalance } from '@/typings/walletAccount';

const SelectAssetField = () => {
  const [searchParams] = useSearchParams();
  const { setValue, control } = useFormContext();

  const { data: options } = useGetAssetOptions({
    onSuccess: (data) => {
      const tokenAddress = searchParams.get('tokenAddress');
      const foundToken = data.find(
        (option) => option.tokenAddress === tokenAddress
      );
      if (!foundToken) {
        return;
      }

      setValue('asset', foundToken?.value);
      setValue('tokenAddress', foundToken?.tokenAddress);
      setValue('isToken', true);
      setValue('maxAssetAmount', foundToken?.amount);
    },
  });
  const { data: { balance } = { balance: 0 }, isFetching } =
    useGetCurrentBalance({
      onSuccess: (data: WalletAccountBalance) => {
        setValue('maxAssetAmount', data.balance);
      },
    });

  return (
    <Controller
      control={control}
      name="asset"
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => {
        const handleOnChangeAsset = (newValue?: string) => {
          if (newValue === 'CSPR') {
            setValue('maxAssetAmount', balance);
          } else {
            const foundToken = options?.find(
              (option) => option.value === newValue
            );

            setValue('maxAssetAmount', foundToken?.amount);
            setValue('tokenAddress', foundToken?.tokenAddress);
            setValue('isToken', true);
          }

          setValue('transferAmount', 0);
          onChange(newValue);
        };

        return (
          <SelectIcon
            value={value}
            onChange={handleOnChangeAsset}
            options={options || []}
            components={{
              SingleValue: ({
                children,
                ...props
              }: SingleValueProps<AssetOption>) => {
                return (
                  <chakraComponents.SingleValue {...props}>
                    <Flex alignItems="center">
                      <Box mr="2">{props.data.icon}</Box>
                      {children}
                      <Flex justifyContent="right" w="100%">
                        {props.data.isToken ? (
                          <Box>{props.data.amount}</Box>
                        ) : (
                          <>
                            {isFetching ? (
                              <Spinner size="sm" />
                            ) : (
                              <Box>{balance}</Box>
                            )}
                          </>
                        )}
                      </Flex>
                    </Flex>
                  </chakraComponents.SingleValue>
                );
              },
            }}
          />
        );
      }}
    />
  );
};

export default SelectAssetField;
