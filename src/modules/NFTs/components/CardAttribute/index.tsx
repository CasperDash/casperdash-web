import { Text, Box } from '@chakra-ui/react';

type Props = {
  attribute?: string;
  value: string;
};

const CardAttirbute = ({ attribute, value }: Props) => {
  return (
    <Box
      alignSelf={{ base: 'flex-start' }}
      p="4"
      border="1px solid"
      borderColor={'gray.200'}
      borderRadius={'5xl'}
      h={'28'}
      w="64"
    >
      <Text fontSize={'xl'} color="gray.400" textTransform="capitalize">
        {attribute}
      </Text>
      <Text isTruncated maxW="xs" mt="4">
        {value}
      </Text>
    </Box>
  );
};

export default CardAttirbute;
