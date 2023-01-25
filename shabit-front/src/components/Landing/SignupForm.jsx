import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import Input from '../common/Input';

// import { BsFillCheckCircleFill } from 'react-icons/bs';

//
{
  /* <BsFillCheckCircleFill /> */
}

const SignupForm = () => {
  return (
    <FormWrapper>
      <div>에러 메세지 출력</div>

      <InputWrapper>
        <Input placeholder={'이메일 아이디'} />
        <Input placeholder={'닉네임'} />
        <Input placeholder={'비밀번호'} />
        <Input placeholder={'비밀번호 확인'} />
      </InputWrapper>

      <button>가입하기</button>
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
    font-size: 0.8rem;
    font-weight: bold;
    color: ${theme.color.redColor};
  }

  & > button {
    background-color: ${theme.color.primary};
    color: ${theme.color.whiteColor};
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
    box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
  }
`;

const InputWrapper = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0;
`;

export default SignupForm;
