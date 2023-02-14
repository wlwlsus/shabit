import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import { HiArrowRightCircle } from 'react-icons/hi2';
import Auth from '../../services/auth';
import { useNavigate } from 'react-router-dom';

import { loadEffect } from '../../styles/animation';
import { FireAlert, FireConfirm } from '../../services';

const LoginForm = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setMessage = (str) => {
    setCurrentMessage(str);
  };

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

  const onLogin = () => {
    if (!email) return setMessage('이메일을 입력해주세요');
    if (!password) return setMessage('비밀번호를 입력해주세요');
    Auth.login(email, password)
      .then(async ({ user, accessToken, refreshToken }) => {
        if (autoLogin) {
          localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
          localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }
        navigate('/main');
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const onReset = () => {
    setIsLoading(true);
    if (!(email.includes('@') && email.includes('.'))) {
      FireAlert('올바르지 않은 이메일입니다.');
      return setIsLoading(false);
    }
    Auth.resetPassword(email)
      .then((res) => {
        setIsLoading(false);
        FireConfirm('임시 비밀번호를 발송하였습니다');
        setForgotPassword(false);
      })
      .catch((err) => {
        setIsLoading(false);
        FireAlert(err.message || '비밀번호 초기화에 실패하였습니다.');
      });
  };

  const goSignup = () => {
    navigate('/signup');
  };

  const onCheckEnter = (e) => {
    if (e.key === 'Enter' && !forgotPassword) {
      onLogin();
    }
  };
  return (
    <FormWrapper onKeyPress={onCheckEnter}>
      <Msg>{message}</Msg>
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
      />

      {!forgotPassword ? (
        <>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder={'비밀번호'}
          />
          <Wrapper>
            <Checkbox>
              <input
                type="checkbox"
                name="autoLogin"
                checked={autoLogin}
                onChange={onChecked}
              />&nbsp;
              <span>자동 로그인</span>
            </Checkbox>
            <Div onClick={() => setForgotPassword(true)}>
              비밀번호를 잊으셨나요?
            </Div>
          </Wrapper>

          <HiArrowRightCircle onClick={onLogin} />
          <Signup>
            <span>아직 계정이 없으신가요?</span>
            <Div onClick={goSignup}>회원가입</Div>
          </Signup>
        </>
      ) : (
        <>
          <StyledButton onClick={onReset}>임시 비밀번호 발급</StyledButton>
          {isLoading ? (
            <StyledImage
              alt="Spinner"
              src="/assets/spinner.gif"
              className="Spinner"
            />
          ) : (
            <></>
          )}
          <StyledCancel
            onClick={() => setForgotPassword(false)}
            style={isLoading ? { visibility: 'hidden' } : {}}
          >
            로그인으로 돌아가기
          </StyledCancel>
        </>
      )}
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
    color: ${(props) => props.theme.color.primary};
    font-size: 3rem;
    transition: all 0.3s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

const StyledCancel = styled.div`
  color: ${(props) => props.theme.color.primary};
  cursor: pointer;
  font-size: 0.7rem;
  margin-top: 1rem;
  transition: transform 0.2s linear;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const StyledImage = styled.img`
  position: absolute;
`;

const Msg = styled.div`
  color: ${(props) => props.theme.color.redColor};
  position: absolute;
  top: 10%;
`;

const Title = styled.div`
  width: 38%;
  color: ${(props) => props.theme.color.grayColor};

  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  width: 70%;
  color: ${(props) => props.theme.color.primary};
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
  color: ${(props) => props.theme.color.primary};
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
    color: ${(props) => props.theme.color.grayColor};
  }

  & > button {
    color: ${(props) => props.theme.color.primary};
    font-weight: bold;
  }
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;

export default LoginForm;
