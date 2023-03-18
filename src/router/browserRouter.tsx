import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/home';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
