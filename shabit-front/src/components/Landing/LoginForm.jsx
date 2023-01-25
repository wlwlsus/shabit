import React from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import ArrowIcon from '../common/ArrowIcon';

const LoginForm = () => {
  return (
    <FormWrapper>
      <div>SHabit에 로그인하고 서비스를 이용해보세요</div>

      <Input placeholder={'아이디'} shadow={'shadow'} />
      <Input placeholder={'비밀번호'} shadow={'shadow'} />

      <Wrapper>
        <input type="checkbox" />
        <span>자동 로그인</span>
        <span>비밀번호를 잊으셨나요?</span>
      </Wrapper>

      <ArrowIcon size={'lg'} color={'primary'} />

      <Signup>
        <span>아직 계정이 없으신가요?</span>
        <span>회원가입</span>
      </Signup>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div:first-child {
    width: 34%;
    margin: 1rem auto;
  }
`;

const Wrapper = styled.div`
  width: 53%;
  display: flex;
  padding-left: 1.5rem;
  justify-content: space-between;
  align-items: center;
`;

const Signup = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default LoginForm;
