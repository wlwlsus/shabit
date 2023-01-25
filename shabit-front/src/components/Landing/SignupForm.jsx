import React from 'react';
import styled from 'styled-components';

import Input from '../common/Input';

import { BsFillCheckCircleFill } from 'react-icons/bs';

const SignupForm = () => {
  return (
    <FormWrapper>
      <BsFillCheckCircleFill />
      <div>에러 메세지 출력</div>

      <InputWrapper>
        <Input placeholder={'이메일 아이디'} />
      </InputWrapper>

      <InputWrapper>
        <Input placeholder={'닉네임'} />
      </InputWrapper>

      <InputWrapper>
        <Input placeholder={'비밀번호'} />
      </InputWrapper>

      <InputWrapper>
        <Input placeholder={'비밀번호 확인'} />
      </InputWrapper>

      <Button>가입하기</Button>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div:first-child {
    margin-bottom: 1.5rem;
  }
`;

const InputWrapper = styled.div``;

const Button = styled.button``;
export default SignupForm;
