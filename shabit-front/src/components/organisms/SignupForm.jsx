import React from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import CheckIcon from '../molecules/CheckIcon';

const SignupForm = () => {
  return (
    <FormWrapper>
      <InputWrapper>
        <Input placeholder={'이메일 아이디'} shadow={'shadow'} />
        <CheckIcon />
        <Label text={'이미 존재합니다'} />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder={'닉네임'} shadow={'shadow'} />
        <CheckIcon />
        <Label text={'이미 존재합니다'} />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder={'비밀번호'} shadow={'shadow'} />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder={'비밀번호 확인'} shadow={'shadow'} />
        <CheckIcon />
        <Label text={'일치하지 않습니다'} />
      </InputWrapper>
      <Button
        text={'가입하기'}
        bg={'primary'}
        color={'secondary'}
        shadow={'shadow'}
      />
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default SignupForm;
