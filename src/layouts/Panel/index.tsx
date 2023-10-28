import { Flex } from '@chakra-ui/react';

import BaseLayout from '../Base';

export type Props = {
  children?: React.ReactNode;
  defaultLightBg?: string;
};

const PanelLayout = ({ children }: Props) => {
  return (
    <BaseLayout defaultLightBg="white" defaultLightHeaderBg="gray.50">
      <Flex>{children}</Flex>
    </BaseLayout>
  );
};

export default PanelLayout;
