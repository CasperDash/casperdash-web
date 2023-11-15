import { useGetTransactions } from '@/hooks/queries/useGetTransactions';
import { useAccount } from '@/hooks/useAccount';

const BackgroundTransactions = () => {
  const { publicKey } = useAccount();
  useGetTransactions(publicKey);

  return null;
};

export default BackgroundTransactions;
