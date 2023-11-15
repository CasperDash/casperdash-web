import { Container, ContainerProps } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
} & ContainerProps;

const MainContainer = ({ children, ...restProps }: Props) => {
  return (
    <Container
      className="main-container"
      padding="36px"
      maxW="1680px"
      {...restProps}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
