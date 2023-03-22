import { Box } from '@chakra-ui/react';

import AccountBalances from './components/AccountBalances';
import AccountInfo from './components/AccountInfo';
import TableTransaction from '@/modules/core/TableTransaction';

const Home = () => {
  return (
    <Box>
      <AccountInfo mt="8" background="gray.200" />
      <AccountBalances mt="8" />
      <TableTransaction mt="14" />
    </Box>
  );
};

export default Home;
