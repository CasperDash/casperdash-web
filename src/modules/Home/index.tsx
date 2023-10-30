import { Box } from '@chakra-ui/react';

import AccountBalances from './components/AccountBalances';
import AccountInfo from './components/AccountInfo';

const Home = () => {
  return (
    <Box w="100%">
      <AccountInfo mt="8" background="gray.200" />
      <AccountBalances mt="8" />
    </Box>
  );
};

export default Home;
