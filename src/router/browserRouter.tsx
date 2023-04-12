import { createBrowserRouter } from 'react-router-dom';

import { PathEnum } from '@/enums';
import HomePage from '@/pages/Home';
import ImportWalletPage from '@/pages/ImportWallet';
import ImportWalletPasswordPage from '@/pages/ImportWallet/NewPassword';
import NewWalletPage from '@/pages/NewWallet';
import NewWalletDoubleCheckPage from '@/pages/NewWallet/DoubleCheck';
import NewWalletPasswordPage from '@/pages/NewWallet/NewPassword';
import SDKPage from '@/pages/SDK';
import SDKConnectWalletPage from '@/pages/SDK/ConnectWallet';
import SendPage from '@/pages/Send';

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
    path: PathEnum.SDK,
    element: <SDKPage />,
  },
  {
    path: PathEnum.SDK_CONNECT_WALLET,
    element: <SDKConnectWalletPage />,
  },
]);
