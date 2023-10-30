import { Container, ContainerProps } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
} & ContainerProps;

const MainContainer = ({ children, ...restProps }: Props) => {
  return (
    <Container {...restProps} maxW="1128px" p="4">
      {children}
    </Container>
  );
};

export default MainContainer;
