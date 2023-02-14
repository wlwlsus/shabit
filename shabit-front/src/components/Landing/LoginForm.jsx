import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import { HiArrowRightCircle } from 'react-icons/hi2';
import Auth from '../../services/auth';
import { useNavigate } from 'react-router-dom';

import { loadEffect } from '../../styles/animation';
// import useDebounce from '../../utils/useDebounce';
// import { changePassword } from '../../services/auth/put';
import { FireAlert, FireConfirm } from '../../services';

const LoginForm = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setCurrentMessage] = useState('');
  // const [currentTimeout, setCurrentTimeout] = useState(null);
  // const [changingPassword, setChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //전체: 메시지을 2초 후 초기화합니다.
  const setMessage = (str) => {
    setCurrentMessage(str);
  };

  //onChange 핸들링입니다.
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    // newpassword: '',
    // newpassword2: '',
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
  // const debouncedPasswordConfirm = useDebounce(newpassword2, 20);
  // useEffect(() => {
  //   if (
  //     debouncedPasswordConfirm &&
  //     debouncedPasswordConfirm.length > newpassword.length - 4
  //   ) {
  //     if (newpassword !== debouncedPasswordConfirm) {
  //       setMessage('비밀번호가 일치하지 않습니다');
  //     } else {
  //       setMessage('');
  //     }
  //   }
  // }, [debouncedPasswordConfirm]);

  //비밀번호 검증 로직입니다.
  // const [passwordMatch, setPasswordMatch] = useState(false);
  // useEffect(() => {
  //   if (newpassword.length >= 8) {
  //     if (
  //       !newpassword.match(
  //         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
  //       )
  //     ) {
  //       setMessage('비밀번호는 영대소문자/숫자/특수문자를 사용해주세요.');
  //       setPasswordMatch(false);
  //     } else {
  //       setMessage('');
  //       setPasswordMatch(true);
  //     }
  //   }
  // }, [newpassword]);

  const onLogin = () => {
    if (!email) return setMessage('이메일을 입력해주세요');
    if (!password) return setMessage('비밀번호를 입력해주세요');
    Auth.login(email, password)
      .then(async ({ user, accessToken, refreshToken }) => {
        if (autoLogin) {
          localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
          localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }
        // if (changingPassword && passwordMatch && newpassword === newpassword2) {
        //   changePassword(email, password, newpassword)
        //     .then(() => {
        //       FireConfirm('비밀번호가 변경되었습니다.');
        //     })
        //     .catch(() => {
        //       FireAlert('비밀번호 변경에 실패하였습니다.');
        //     });
        // }
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
        // setMessage('임시 비밀번호로 로그인해주세요');
        setForgotPassword(false);
        // setChangingPassword(true);
        // setTimeout(() => {
        //   setMessage('');
        // }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        FireAlert(err.message || '비밀번호 초기화에 실패하였습니다.');
        // setMessage(err.message || '비밀번호 초기화에 실패하였습니다.');
        // setTimeout(() => {
        //   setMessage('');
        //   // setForgotPassword(false);
        // }, 1000);
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
  // #################################################
  // 전체 검증 로직입니다. 하위 호환을 위해 아래와 같이 추가 작성하였습니다.
  // useEffect(() => {
  //   if (message) return;
  // if (
  //   debouncedPasswordConfirm.length > 4 &&
  //   newpassword !== debouncedPasswordConfirm
  // ) {
  //   setMessage('비밀번호가 일치하지 않습니다');
  // }
  // if (
  //   (newpassword.length < 8 && newpassword.length > 0) ||
  //   newpassword.length > 16
  // ) {
  //   setMessage('비밀번호는 8자 이상 16자 이하입니다.');
  // }
  // if (newpassword.length >= 8) {
  //   if (
  //     !newpassword.match(
  //       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
  //     )
  //   ) {
  //     setMessage('비밀번호는 영대소문자/숫자/특수문자를 사용해주세요.');
  //   }
  // }
  // }, [message]);
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
          {/* {changingPassword ? (
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
          )} */}
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
