import Header from './Header';
import SimpleSidebar from './Sidebar';
import BaseLayout from '../Base';

export type Props = {
  children?: React.ReactNode;
  defaultLightBg?: string;
};

// MasterPanelLayout
const PanelLayout = ({ children }: Props) => {
  return (
    <BaseLayout defaultLightBg="white" defaultLightHeaderBg="gray.50">
      <Header />
      <SimpleSidebar>
        <p>Duc</p>
        {children}
      </SimpleSidebar>
    </BaseLayout>
  );
};

export default PanelLayout;
