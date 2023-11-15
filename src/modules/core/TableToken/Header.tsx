import { Flex, Text } from '@chakra-ui/react';
import { z } from 'zod';

const tokenSchema = z.object({
  tokenAddress: z.string().nonempty('token_address_required').default(''),
  name: z.string().nonempty('name_required').default(''),
  symbol: z.string().nonempty('symbol_required').default(''),
  decimals: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0, 'decimals_required')
    .default('0'),
});

export type SubmitValues = z.infer<typeof tokenSchema>;

const TableTokenHeader = () => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Text color="gray.500" fontSize="xl">
        {/* {t('my_tokens')} */}
      </Text>
    </Flex>
  );
};

export default TableTokenHeader;
