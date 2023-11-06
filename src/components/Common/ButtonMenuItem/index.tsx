import { Button, ButtonProps } from '@chakra-ui/react';

interface ButtonMenuItemProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonMenuItem = (props: ButtonMenuItemProps) => {
  const { children, ...rest } = props;
  return (
    <Button
      transitionDuration={'200ms'}
      background={'panelBackground'}
      // shadow="panelShadow"
      p="6"
      w="100%"
      borderRadius="lg"
      justifyContent="flex-start"
      backgroundSize={'200% auto'}
      color={'gray.600'}
      _hover={{
        backgroundPosition: 'right center',
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonMenuItem;
