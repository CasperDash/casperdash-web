import React from 'react';

import { Outlet } from 'react-router-dom';

import LightLayout from '@/layouts/Light';

const Layout = () => {
  return (
    <LightLayout>
      <Outlet />
    </LightLayout>
  );
};

export default Layout;
