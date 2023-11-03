import { Container, ContainerProps } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
} & ContainerProps;

const MainContainer = ({ children, ...restProps }: Props) => {
  return (
    <Container {...restProps} padding="36px" maxW="1280px">
      {children}
    </Container>
  );
};

export default MainContainer;
