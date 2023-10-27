import React from 'react';

import { Outlet } from 'react-router-dom';

import BaseLayout from '@/layouts/Base';

const Layout = () => {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default Layout;
