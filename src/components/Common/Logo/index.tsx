import { Badge, Flex, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import CasperDashLogoImg from '@/assets/img/casperdash.webp';
import { PathEnum } from '@/enums';
import { useOnlineStatus } from '@/hooks/helpers/useOnlineStatus';

const Logo = () => {
  const { t } = useTranslation();
  const { offline } = useOnlineStatus();
  return (
    <Link to={PathEnum.HOME}>
      <Image src={CasperDashLogoImg} alt="logo" width={{ base: '84px' }} />
      <Flex justifyContent="center" gap="2">
        {offline && <Badge variant="outline">{t('offline')}</Badge>}
        <Badge variant="outline">{t('beta')}</Badge>
      </Flex>
    </Link>
  );
};

export default Logo;
