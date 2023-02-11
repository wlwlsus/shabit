import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import { HiArrowRightCircle } from 'react-icons/hi2';
import Auth from '../../services/auth';
import { useNavigate } from 'react-router-dom';

import { loadEffect } from '../../styles/animation';
import useDebounce from '../../utils/useDebounce';
import { changePassword } from '../../services/auth/put';
import { FireAlert, FireConfirm } from '../../services';

const LoginForm = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setCurrentMessage] = useState('');
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);
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
    newpassword: '',
    newpassword2: '',
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
  const { email, password, autoLogin, newpassword, newpassword2 } = inputs;
  // ###############################
  const debouncedPasswordConfirm = useDebounce(newpassword2, 20);
  useEffect(() => {
    if (
      debouncedPasswordConfirm &&
      debouncedPasswordConfirm.length > newpassword.length - 4
    ) {
      if (newpassword !== debouncedPasswordConfirm) {
        setMessage('비밀번호가 일치하지 않습니다');
      } else {
        setMessage('');
      }
    }
  }, [debouncedPasswordConfirm]);

  //비밀번호 검증 로직입니다.
  const [passwordMatch, setPasswordMatch] = useState(false);
  useEffect(() => {
    if (newpassword.length >= 8) {
      if (
        !newpassword.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
        )
      ) {
        setMessage('영문 대소문자, 숫자, 특수문자를 사용하세요.');
        setPasswordMatch(false);
      } else {
        setMessage('');
        setPasswordMatch(true);
      }
    }
  }, [newpassword]);

  const onLogin = () => {
    Auth.login(email, password)
      .then(async ({ user, accessToken, refreshToken }) => {
        if (autoLogin) {
          localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
          localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }
        if (changingPassword && passwordMatch && newpassword === newpassword2) {
          changePassword(email, password, newpassword)
            .then(() => {
              FireConfirm('비밀번호가 변경되었습니다.');
            })
            .catch(() => {
              FireAlert('비밀번호 변경에 실패하였습니다.');
            });
        }
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
        setChangingPassword(true);
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
          {changingPassword ? (
            <>
              <Input
                type="password"
                name="newpassword"
                value={newpassword}
                onChange={onChangeHandler}
                placeholder={'신규 비밀번호'}
              />
              <Input
                type="password"
                name="newpassword2"
                value={newpassword2}
                onChange={onChangeHandler}
                placeholder={'신규 비밀번호 확인'}
              />
            </>
          ) : (
            <></>
          )}
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
    color: ${(props) => props.theme.color.primary};
    font-size: 3rem;
    transition: all 0.3s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
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
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;

export default LoginForm;
