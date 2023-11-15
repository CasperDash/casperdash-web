import BaseLayout from '../Base';

export type Props = {
  children?: React.ReactNode;
  defaultLightBg?: string;
};

const LightLayout = ({ children }: Props) => {
  return (
    <BaseLayout defaultLightBg="white" defaultLightHeaderBg="gray.50">
      {children}
    </BaseLayout>
  );
};

export default LightLayout;
