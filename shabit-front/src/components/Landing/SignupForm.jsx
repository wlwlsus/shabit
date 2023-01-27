import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import useDebounce from '../../utils/useDebounce';
import Services from '../../services';
import Input from '../common/Input';
import ConfirmForm from './ConfirmForm';
import Auth from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: '',
  });
  const [needCheck, setNeedCheck] = useState(false);
  const [confirmingEmail, setConfirmingEmail] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  //전체: 회원가입 폼의 인풋 태그를 관리합니다.
  const { email, nickname, password, password2 } = inputs;

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //전체: API 통신 내용 혹은 메시지를 관리합니다.
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

  //비밀번호 일치 여부를 검증합니다.
  const debouncedPasswordConfirm = useDebounce(password2, 300);
  useEffect(() => {
    if (debouncedPasswordConfirm) {
      if (password !== debouncedPasswordConfirm) {
        setMessage('비밀번호가 일치하지 않습니다');
      }
    }
  }, [debouncedPasswordConfirm]);

  //비밀번호 검증 로직입니다.
  const [passwordMatch, setPasswordMatch] = useState(false);
  useEffect(() => {
    if (password.length >= 8) {
      if (
        !password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&]{8,16}/,
        )
      ) {
        setMessage('영문 대소문자, 숫자, 특수문자를 사용하세요.');
        setPasswordMatch(false);
      } else {
        setMessage('');
        setPasswordMatch(true);
      }
    }
  }, [password]);

  //닉네임 검증 로직입니다.
  const [nicknameMatch, setNicknameMatch] = useState(false);
  useEffect(() => {
    if (nickname.length > 1) {
      if (
        !nickname.match(/^(?=.*[a-z0-9ㄱ-ㅎ가-힣])[a-z0-9ㄱ-ㅎ가-힣]{2,16}$/)
      ) {
        setMessage('사용 불가능한 닉네임입니다');
        setNicknameMatch(false);
      } else {
        setMessage('');
        setNicknameMatch(true);
      }
    }
  }, [nickname]);
  //이메일 인증 로직입니다.
  const debouncedEmailTerm = useDebounce(email, 700);
  useEffect(() => {
    setIsConfirmed(false);
    if (debouncedEmailTerm.includes('@') && debouncedEmailTerm.includes('.')) {
      Services.Auth.checkEmail(debouncedEmailTerm)
        .then((res) => {
          setMessage('');
          setNeedCheck(true);
        })
        .catch((err) => {
          setMessage(err.message);
          setNeedCheck(false);
        });
    } else {
      setNeedCheck(false);
    }
  }, [debouncedEmailTerm]);

  const onConfirmed = () => {
    setNeedCheck(false);
    setConfirmingEmail(false);
    setIsConfirmed(true);
  };

  //회원가입 진행 로직입니다.
  const onSignup = () => {
    Auth.register(email, nickname, password).then((value) => {
      if (value) {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      }
    });
  };
  // #################################################
  return (
    <FormWrapper>
      {!message ? <div></div> : <div>{message}</div>}
      <InputWrapper>
        <Input
          placeholder={'이메일 아이디'}
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
        />
        <RightTag>
          {needCheck ? (
            <button type="button" onClick={() => setConfirmingEmail(true)}>
              이메일 인증하기
            </button>
          ) : (
            <></>
          )}
          {confirmingEmail ? (
            <ConfirmModal>
              <ConfirmForm onConfirmed={onConfirmed}></ConfirmForm>
            </ConfirmModal>
          ) : (
            <></>
          )}
        </RightTag>
        <Input
          placeholder={'닉네임'}
          type="text"
          name="nickname"
          value={nickname}
          onChange={onChangeHandler}
        />
        <Input
          placeholder={'비밀번호'}
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
        />
        <Input
          placeholder={'비밀번호 확인'}
          type="password"
          name="password2"
          value={password2}
          onChange={onChangeHandler}
        />
      </InputWrapper>
      {isConfirmed &&
      nicknameMatch &&
      passwordMatch &&
      password === password2 ? (
        <button onClick={onSignup}>가입하기</button>
      ) : (
        <button style={{ backgroundColor: `${theme.color.grayColor}` }}>
          가입하기
        </button>
      )}
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
    font-size: 0.8rem;
    font-weight: bold;
    color: ${theme.color.redColor};
  }

  & > button {
    background-color: ${theme.color.primary};
    color: ${theme.color.whiteColor};
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
    box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
  }
`;

const InputWrapper = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0;
`;

const RightTag = styled.div`
  position: absolute;
  top: 5.3rem;
  left: 51.3rem;
  & > button {
    background-color: ${theme.color.greenColor};
    color: ${theme.color.whiteColor};
    font-size: 0.7rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
    box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
  }
`;

const ConfirmModal = styled.div`
  position: absolute;
  left: -250px;
  top: -60px;
  background-color: white;
  width: 350px;
  height: 350px;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;

export default SignupForm;