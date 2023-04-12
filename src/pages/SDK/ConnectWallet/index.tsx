import React from 'react';

import BaseLayout from '@/layouts/Base';
import SDKConnectWallet from '@/modules/SDK/ConnectWallet';

const SDKConnectWalletPage = () => {
  return (
    <BaseLayout>
      <SDKConnectWallet />
    </BaseLayout>
  );
};

export default SDKConnectWalletPage;
