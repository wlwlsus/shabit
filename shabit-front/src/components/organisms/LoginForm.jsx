import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Input from '../atoms/Input';
import ArrowBtn from '../molecules/ArrowBtn';

const LoginForm = () => {
  return (
    <FormWrapper>
      <Label text={'SHabit에 로그인하고 서비스를 이용해보세요'} />
      <Input placeholder={'아이디'} shadow={'shadow'} />
      <Input placeholder={'비밀번호'} shadow={'shadow'} />
      <Checkbox>
        <Input role={'checkbox'} />
        <Label text={'자동 로그인'} />
      </Checkbox>
      <Label text={'비밀번호를 잊으셨나요?'} />

      <ArrowBtn size={'lg'} />

      <Signup>
        <Label text={'아직 계정이 없으신가요?'} />
        <Label text={'회원가입'} />
      </Signup>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5rem;
`;

const Checkbox = styled.div``;

const Signup = styled.div``;
export default LoginForm;
