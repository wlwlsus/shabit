import React from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import CheckIcon from '../molecules/CheckIcon';

const SignupForm = () => {
  return (
    <FormWrapper>
      <Label text={'에러 메세지 출력'} size={'xs'} color={'red'} />

      <InputWrapper>
        <Input placeholder={'이메일 아이디'} shadow={'shadow'} />
        <CheckIcon color={'primary'} />
      </InputWrapper>

      <InputWrapper>
        <Input placeholder={'닉네임'} shadow={'shadow'} />
        <CheckIcon color={'primary'} />
      </InputWrapper>

      <InputWrapper>
        <Input placeholder={'비밀번호'} shadow={'shadow'} color={'red'} />
        <CheckIcon color={'primary'} />
      </InputWrapper>

      <InputWrapper>
        <Input placeholder={'비밀번호 확인'} shadow={'shadow'} />
        <CheckIcon color={'primary'} />
      </InputWrapper>
      <Button
        text={'가입하기'}
        bg={'primary'}
        color={'white'}
        shadow={'shadow'}
        p={1}
      />
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

export default SignupForm;
