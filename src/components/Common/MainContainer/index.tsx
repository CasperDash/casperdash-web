import { Container, ContainerProps } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
} & ContainerProps;

const MainContainer = ({ children, ...restProps }: Props) => {
  console.log('children: ', children);
  return (
    <Container {...restProps} maxW="1128px">
      {children}
    </Container>
  );
};

export default MainContainer;