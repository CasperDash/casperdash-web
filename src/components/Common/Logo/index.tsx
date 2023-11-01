import { Badge, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import CasperDashLogoImg from '@/assets/img/casperdash-logo.png';
import { PathEnum } from '@/enums';
import { useOnlineStatus } from '@/hooks/helpers/useOnlineStatus';

const Logo = () => {
  const { t } = useTranslation();
  const { offline } = useOnlineStatus();
  return (
    <Link to={PathEnum.HOME}>
      <Image
        src={CasperDashLogoImg}
        alt="logo"
        // width={{ base: '120px', md: '160px' }}
      />
      {offline && (
        <Badge mt="2" variant="outline">
          {t('offline')}
        </Badge>
      )}
    </Link>
  );
};

export default Logo;
