import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import useDebounce from '../../utils/useDebounce';
import Services from '../../services';
import Input from '../common/Input';

const SignupForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: '',
    emailCheck: '',
  });
  const [needCheck, setNeedCheck] = useState(false);

  //전체: 회원가입 폼의 인풋 태그를 관리합니다.
  const { email, nickname, password, password2, emailCheck } = inputs;

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //전체: API 통신 내용 혹은 메시지를 관리합니다.
  const [message, setCurrentMessage] = useState('');
  //전체: 메시지을 2초 후 초기화합니다.
  const setMessage = (str) => {
    setCurrentMessage(str);
    setTimeout(() => {
      setCurrentMessage('');
    }, 2000);
  };

  //비밀번호 일치 여부를 검증합니다.
  const debouncedPasswordConfirm = useDebounce(password2, 300);
  useEffect(() => {
    if (debouncedPasswordConfirm) {
      if (password !== password2) {
        setMessage('비밀번호가 일치하지 않습니다');
      }
    }
  }, [debouncedPasswordConfirm]);

  //이메일 인증 로직입니다.
  const debouncedEmailTerm = useDebounce(email, 700);
  useEffect(() => {
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
          {needCheck ? <button>이메일 인증하기</button> : <></>}
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

      <button>가입하기</button>
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

export default SignupForm;
