import { createBrowserRouter } from 'react-router-dom';

import { PathEnum } from '@/enums';
import HomePage from '@/pages/Home';
import ImportWalletPage from '@/pages/ImportWallet';
import ImportWalletPasswordPage from '@/pages/ImportWallet/NewPassword';
import NewWalletPage from '@/pages/NewWallet';
import NewWalletDoubleCheckPage from '@/pages/NewWallet/DoubleCheck';
import NewWalletPasswordPage from '@/pages/NewWallet/NewPassword';

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
]);
