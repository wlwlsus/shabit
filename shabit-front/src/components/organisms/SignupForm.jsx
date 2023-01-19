import React from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import CheckIcon from '../molecules/CheckIcon';

const SignupForm = () => {
  return (
    <FormWrapper>
      <Label text={'이미 존재합니다'} size={'xs'} color={'red'} />
      <InputWrapper>
        <Input placeholder={'이메일 아이디'} shadow={'shadow'} />
        <CheckIcon color={'primary'} />
      </InputWrapper>
      <Label text={'이미 존재합니다'} size={'xs'} color={'red'} />
      <InputWrapper>
        <Input placeholder={'닉네임'} shadow={'shadow'} />
        <CheckIcon color={'primary'} />
      </InputWrapper>
      <InputWrapper>
        <Input placeholder={'비밀번호'} shadow={'shadow'} color={'red'} />
      </InputWrapper>
      <Label text={'일치하지 않습니다'} size={'xs'} color={'red'} />
      <InputWrapper>
        <Input placeholder={'비밀번호 확인'} shadow={'shadow'} />
        <CheckIcon color={'primary'} />
      </InputWrapper>
      <Button
        text={'가입하기'}
        bg={'primary'}
        color={'secondary'}
        shadow={'shadow'}
        p={1}
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
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default SignupForm;
