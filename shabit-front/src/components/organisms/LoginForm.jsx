import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import CheckBox from '../molecules/CheckBox';
import ArrowIcon from '../molecules/ArrowIcon';

const LoginForm = () => {
  return (
    <FormWrapper>
      <Label
        text={'SHabit에 로그인하고 서비스를 이용해보세요'}
        color={'gray'}
      />

      <Input placeholder={'아이디'} shadow={'shadow'} />
      <Input placeholder={'비밀번호'} shadow={'shadow'} />

      <Wrapper>
        <CheckBox text={'자동로그인'} color={'primary'} />
        <Button text={'비밀번호를 잊으셨나요?'} size={'xs'} color={'primary'} />
      </Wrapper>

      <ArrowIcon size={'lg'} color={'primary'} />

      <Signup>
        <Label text={'아직 계정이 없으신가요?'} color={'gray'} />
        <Button text={'회원가입'} color={'primary'} />
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
