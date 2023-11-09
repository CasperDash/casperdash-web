import { Heading, Flex, Stack, Radio, RadioGroup } from '@chakra-ui/react';
const NFTFilters = () => {
  return (
    <Flex direction={'column'}>
      <Flex direction={'column'}>
        <Heading as="h5" size="sm" mb={4}>
          Types
        </Heading>
        <RadioGroup>
          <Stack spacing={2}>
            <Radio value="1">Listing NFTs</Radio>
            <Radio value="2">Cannot list</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};

export default NFTFilters;
