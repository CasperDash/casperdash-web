import React from 'react';

import { Outlet } from 'react-router-dom';

import PanelLayout from '@/layouts/Panel';

const Layout = () => {
  return (
    <PanelLayout>
      <Outlet />
    </PanelLayout>
  );
};

export default Layout;
