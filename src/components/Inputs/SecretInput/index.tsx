import { forwardRef, useState } from 'react';

import {
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = InputProps;

const SecretInput = forwardRef(({ ...props }: Props, ref) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <InputGroup>
      <Input {...props} type={show ? 'text' : 'password'} ref={ref} />
      <InputRightElement mt="1">
        <Icon
          as={show ? AiOutlineEyeInvisible : AiOutlineEye}
          cursor={'pointer'}
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>
  );
});

SecretInput.displayName = 'SecretInput';

export default SecretInput;
