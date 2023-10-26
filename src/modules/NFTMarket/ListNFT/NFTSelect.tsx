import { Box, Button, Text } from '@chakra-ui/react';

type Props = {
  onNext: () => void;
};

const NFTSelect = ({ onNext }: Props) => {
  return (
    <Box>
      <Text>Choose your NFT</Text>
      <Button onClick={onNext}>Next</Button>
    </Box>
  );
};

export default NFTSelect;
