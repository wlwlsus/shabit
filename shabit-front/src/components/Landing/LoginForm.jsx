import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import Input from '../common/Input';
import { HiArrowRightCircle } from 'react-icons/hi2';
import Auth from '../../services/auth';
import { useNavigate } from 'react-router-dom';

import { loadEffect } from '../common/animation';

const LoginForm = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setCurrentMessage] = useState('');
  const [currentTimeout, setCurrentTimeout] = useState(null);
  //전체: 메시지을 2초 후 초기화합니다.
  const setMessage = (str) => {
    setCurrentMessage(str);
    if (!str) return;
    clearTimeout(currentTimeout);
    const newTimeout = setTimeout(() => {
      setCurrentMessage('');
    }, 2000);
    setCurrentTimeout(newTimeout);
  };

  //onChange 핸들링입니다.
  const navigate = useNavigate();
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

  const onLogin = () => {
    Auth.login(email, password)
      .then(({ user, accessToken }) => {
        navigate('/main');
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const onReset = () => {
    Auth.resetPassword(email)
      .then((res) => {
        setMessage('임시 비밀번호를 발송하였습니다');
        setTimeout(() => {
          setMessage('');
          setForgotPassword(false);
        }, 1000);
      })
      .catch((err) => {
        setMessage('비밀번호가 초기화에 실패하였습니다');
        setTimeout(() => {
          setMessage('');
          setForgotPassword(false);
        }, 1000);
      });
  };

  const goSignup = () => {
    navigate('/signup');
  };

  return (
    <FormWrapper>
      <Title
        style={{
          color: 'red',
          position: 'absolute',
          left: '640px',
          top: '20px',
        }}
      >
        {message}
      </Title>
      {!forgotPassword ? (
        <Title>SHabit에 로그인하고 서비스를 이용해보세요</Title>
      ) : (
        <Title>임시 비밀번호를 받을 이메일을 입력해주세요</Title>
      )}
      <Input
        type="email"
        name="email"
        value={email}
        onChange={onChangeHandler}
        placeholder={'아이디'}
        shadow={'shadow'}
      />
      {!forgotPassword ? (
        <>
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
            <Div onClick={() => setForgotPassword(true)}>
              비밀번호를 잊으셨나요?
            </Div>
          </Wrapper>
          <HiArrowRightCircle onClick={onLogin} />
        </>
      ) : (
        <>
          <StyledButton onClick={onReset}>비밀번호 초기화</StyledButton>
        </>
      )}

      <Signup>
        <span>아직 계정이 없으신가요?</span>
        <Div onClick={goSignup}>회원가입</Div>
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

  animation: 0.8s ease-in ${loadEffect.left};

  & > svg {
    color: ${theme.color.primary};
    font-size: 3rem;
    transition: all 0.3s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

const Title = styled.div`
  width: 38%;
  color: ${theme.color.grayColor};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  width: 70%;
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

const Div = styled.div`
  color: ${theme.color.primary};
  transition: all 0.2s linear;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Signup = styled.div`
  width: 80%;
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

const StyledButton = styled.button`
  margin-top: 0.5rem;
  background-color: ${theme.color.primary};
  color: ${theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
export default LoginForm;
