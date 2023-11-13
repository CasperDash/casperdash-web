import { Text, Box, Tooltip } from '@chakra-ui/react';

type Props = {
  attribute?: string;
  value: string;
};

const CardAttribute = ({ attribute, value }: Props) => {
  return (
    <Box
      alignSelf={{ base: 'flex-start' }}
      px="4"
      py="2"
      border="1px solid"
      borderColor={'gray.200'}
      borderRadius={'2xl'}
      h={'18'}
      w="40"
    >
      <Text
        isTruncated
        fontSize={'l'}
        color="gray.400"
        textTransform="capitalize"
      >
        {attribute}
      </Text>
      <Tooltip label={value}>
        <Text isTruncated maxW="xs">
          {value}
        </Text>
      </Tooltip>
    </Box>
  );
};

export default CardAttribute;
