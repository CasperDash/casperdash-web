import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Text,
  Flex,
  Stack,
  Radio,
  RadioGroup,
  HStack,
  Select,
} from '@chakra-ui/react';

import space from '@/theme/foundations/space';

const NFTFilters = () => {
  return (
    <Flex direction={'column'} rowGap={space['8']}>
      <Flex direction={'column'}>
        <Box bgColor="gray.200" p={2} py={3} mb={3} borderRadius="lg">
          <Text fontWeight={600} size="md">
            Statuses
          </Text>
        </Box>
        <RadioGroup>
          <Stack spacing={3}>
            <Radio value="1">Listing NFTs</Radio>
            <Radio value="2">Cannot list</Radio>
            <Radio value="3">None</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction={'column'}>
        <Box bgColor="gray.200" p={2} py={3} mb={3} borderRadius="lg">
          <Text fontWeight={600} size="md">
            Collections
          </Text>
        </Box>
        <RadioGroup>
          <Stack spacing={3}>
            <Radio value="1">EggForce</Radio>
            <Radio value="2">CasperPunk</Radio>
            <Radio value="3">Show All</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction={'column'}>
        <Box bgColor="gray.200" p={2} py={3} mb={3} borderRadius="lg">
          <Text fontWeight={600} size="md">
            Smart Contract
          </Text>
        </Box>
        <RadioGroup>
          <Stack spacing={3}>
            <Radio value="1">CEP48</Radio>
            <Radio value="2">CEP78</Radio>
            <Radio value="3">Show All</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction={'column'}>
        <Box bgColor="gray.200" p={2} py={3} mb={3} borderRadius="lg">
          <Text fontWeight={600} size="md">
            Price range
          </Text>
        </Box>
        <HStack>
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme="red"
            defaultValue={[10, 30]}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Select variant="filled" value="cspr">
            <option value="cspr">CSPR</option>
            <option value="usdt">USD</option>
          </Select>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default NFTFilters;
