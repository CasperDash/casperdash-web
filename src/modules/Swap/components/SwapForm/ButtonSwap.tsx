import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useValidateSwap } from '@/modules/Swap/hooks/useValidateSwap';

export const ButtonSwap = () => {
  const { t } = useTranslation();

  const validateSwap = useValidateSwap();

  const validated = validateSwap();
  return (
    <Button
      variant="primary"
      type="submit"
      w="100%"
      isDisabled={!validated.isValid}
    >
      {validated.error ? validated.error : t('swap')}
    </Button>
  );
};
