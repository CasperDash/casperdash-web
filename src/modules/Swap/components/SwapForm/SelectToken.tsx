import { Box, Flex, Input, Text } from '@chakra-ui/react';

const SelectToken = () => {
  return (
    <Flex p="4" h="12" border="1px solid" borderColor="gray.200">
      <Flex justifyContent={'space-between'} w="100%">
        <Flex>
          <Box></Box>
          <Text>CSPR</Text>
        </Flex>
        <Flex>
          <Input />
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default SelectToken;
