import { Box, Flex, Input, Text } from '@chakra-ui/react';

import CircleWrapper from '@/components/Surface/CircleWrapper';
import { ArrowDownIcon } from '@/icons';

type SelectTokenProps = {
  onClick?: () => void;
};

const SelectToken = ({ onClick }: SelectTokenProps) => {
  return (
    <Flex
      p="4"
      h="18"
      border="1px solid"
      borderColor="gray.200"
      borderRadius={'xl'}
    >
      <Flex
        justifyContent={'space-between'}
        alignItems="center"
        w="100%"
        gap="2"
      >
        <Flex
          flexBasis={1}
          alignItems="center"
          _hover={{ color: 'light', cursor: 'pointer' }}
          onClick={onClick}
        >
          <CircleWrapper />
          <Text ml="3">CSPR</Text>
          <Box ml="3.5">
            <ArrowDownIcon />
          </Box>
        </Flex>
        <Flex flexBasis={0} flexGrow={'9999'} w="100%">
          <Input
            textAlign={'right'}
            variant="unstyled"
            border={'none'}
            placeholder="0.0"
          />
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default SelectToken;
