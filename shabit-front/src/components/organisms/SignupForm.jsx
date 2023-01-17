import React from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SignupForm = () => {
  return (
    <FormWrapper>
      <Input placeholder={'이메일 아이디'} />
      <Input placeholder={'닉네임'} />
      <Input placeholder={'비밀번호'} />
      <Input placeholder={'비밀번호 확인'} />
      <Button />
    </FormWrapper>
  );
};

const FormWrapper = styled.div``;

export default SignupForm;
