import { createBrowserRouter } from 'react-router-dom';

import { PathEnum } from '@/enums';
import HomePage from '@/pages/HomePage';
import ImportWalletPage from '@/pages/ImportWalletPage';
import ImportWalletPasswordPage from '@/pages/ImportWalletPage/NewPassword';
import NewWalletPage from '@/pages/NewWalletPage';
import NewWalletDoubleCheckPage from '@/pages/NewWalletPage/DoubleCheck';
import NewWalletPasswordPage from '@/pages/NewWalletPage/NewPassword';
import NFTsPage from '@/pages/NFTsPage';
import NFTDetailPage from '@/pages/NFTsPage/NFTDetailPage';
import SendPage from '@/pages/SendPage';
import StakingPage from '@/pages/StakingPage';

export const browserRouter = createBrowserRouter([
  {
    path: PathEnum.HOME,
    element: <HomePage />,
  },
  {
    path: PathEnum.NEW_WALLET,
    element: <NewWalletPage />,
  },
  {
    path: PathEnum.DOUBLE_CHECK,
    element: <NewWalletDoubleCheckPage />,
  },
  {
    path: PathEnum.NEW_PASSWORD,
    element: <NewWalletPasswordPage />,
  },
  {
    path: PathEnum.IMPORT_WALLET,
    element: <ImportWalletPage />,
  },
  {
    path: PathEnum.IMPORT_WALLET_NEW_PASSWORD,
    element: <ImportWalletPasswordPage />,
  },
  {
    path: PathEnum.SEND,
    element: <SendPage />,
  },
  {
    path: PathEnum.NFT,
    element: <NFTsPage />,
  },
  {
    path: PathEnum.NFT_DETAIL,
    element: <NFTDetailPage />,
  },
  {
    path: PathEnum.STAKING,
    element: <StakingPage />,
  },
]);

export default browserRouter;
