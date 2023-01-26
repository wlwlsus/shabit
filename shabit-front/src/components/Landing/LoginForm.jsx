import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import Input from '../common/Input';
import ArrowIcon from '../common/ArrowIcon';
import { onLogin } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  //onChange 핸들링입니다.
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    autoLogin: false,
  });
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onChecked = () => {
    setInputs({
      ...inputs,
      autoLogin: !inputs.autoLogin,
    });
  };
  const { email, password, autoLogin } = inputs;
  // ###############################

  return (
    <FormWrapper>
      <Title>SHabit에 로그인하고 서비스를 이용해보세요</Title>
      <Input
        type="email"
        name="email"
        value={email}
        onChange={onChangeHandler}
        placeholder={'아이디'}
        shadow={'shadow'}
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={onChangeHandler}
        placeholder={'비밀번호'}
        shadow={'shadow'}
      />

      <Wrapper>
        <Checkbox>
          <input
            type="checkbox"
            name="autoLogin"
            checked={autoLogin}
            onChange={onChecked}
          />
          <span>자동 로그인</span>
        </Checkbox>
        <span>비밀번호를 잊으셨나요?</span>
      </Wrapper>

      <div
        onClick={() => {
          dispatch(onLogin({ email, password, autoLogin }));
          console.log('클릭됨');
        }}
      >
        <ArrowIcon size={'lg'} color={'primary'} />
      </div>

      <Signup>
        <span>아직 계정이 없으신가요?</span>
        <button>회원가입</button>
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
`;

const Title = styled.div`
  width: 34%;
  color: ${theme.color.grayColor};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  width: 57%;
  color: ${theme.color.primary};
  font-size: 0.7rem;
  padding-left: 1.5rem;
  margin: 0.2rem 0 1rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const Signup = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 0;
  font-size: 0.9rem;

  & > span {
    color: ${theme.color.grayColor};
  }

  & > button {
    color: ${theme.color.primary};
    font-weight: bold;
  }
`;

export default LoginForm;
