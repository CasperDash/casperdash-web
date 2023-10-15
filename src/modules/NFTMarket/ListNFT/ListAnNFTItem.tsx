import { Box, Button, Text } from '@chakra-ui/react';

type Props = {
  onNext: () => void;
};

const ListAnNFTItem = ({ onNext }: Props) => {
  return (
    <Box>
      <Text>List An NFT</Text>
      <Button onClick={onNext}>Next</Button>
    </Box>
  );
};

export default ListAnNFTItem;
