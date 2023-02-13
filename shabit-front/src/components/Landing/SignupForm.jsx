import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../utils/useDebounce';
import Services, { FireConfirm } from '../../services';
import Input from '../common/Input';
import ConfirmForm from './ConfirmForm';
import Auth from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { confirmEmail } from '../../services/auth/get';

import { loadEffect } from '../../styles/animation';
import { AiOutlineClose } from 'react-icons/ai';

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
  const [isLoading, setIsLoading] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');

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

  const setMessage = (str) => {
    setCurrentMessage(str);
  };

  //비밀번호 일치 여부를 검증합니다.
  const debouncedPasswordConfirm = useDebounce(password2, 100);
  useEffect(() => {
    if (
      debouncedPasswordConfirm &&
      debouncedPasswordConfirm.length > password.length - 4
    ) {
      if (password !== debouncedPasswordConfirm) {
        setMessage('비밀번호가 일치하지 않습니다');
      } else {
        setMessage('');
      }
    } else {
      setMessage('');
    }
  }, [debouncedPasswordConfirm]);

  //비밀번호 검증 로직입니다.
  const [passwordMatch, setPasswordMatch] = useState(false);
  const debouncedPassword = useDebounce(password, 200);

  useEffect(() => {
    if (password.length === 0) return setMessage('');
    if (
      (debouncedPassword.length < 8 && debouncedPassword.length > 0) ||
      password.length > 16
    ) {
      setPasswordMatch(false);
      return setMessage('비밀번호는 8자 이상 16자 이하입니다.');
    }
    if (password.length >= 8) {
      if (
        !password.match(
          // /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&]{8,16}/,
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
        )
      ) {
        setMessage('비밀번호는 영대소문자/숫자/특수문자를 사용해주세요.');
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
    if (nickname.length < 2) return setNicknameMatch(false);
    if (nickname.length > 1) {
      if (nickname.length > 16) {
        setMessage('닉네임은 2~16글자 입니다.');
        setNicknameMatch(false);
      } else if (
        !nickname.match(/^(?=.*[a-z0-9ㄱ-ㅎ가-힣])[a-z0-9ㄱ-ㅎ가-힣]{2,16}$/)
      ) {
        setMessage('닉네임에 특수문자를 사용할 수 없습니다.');
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
          console.log(err.message);
          setMessage(err.message);
          setNeedCheck(false);
        });
    } else {
      setMessage('');
      setNeedCheck(false);
    }
  }, [debouncedEmailTerm]);

  const onChekingEmail = () => {
    setIsLoading(true);
    confirmEmail(email)
      .then((res) => {
        setConfirmCode(res);
      })
      .then(() => {
        setIsLoading(false);
        setConfirmingEmail(true);
      });
  };

  const onConfirmed = () => {
    setMessage('');
    setNeedCheck(false);
    setConfirmingEmail(false);
    setIsConfirmed(true);
  };

  //회원가입 진행 로직입니다.
  const onSignup = () => {
    if (message) return;
    Auth.register(email, nickname, password).then((value) => {
      if (value) {
        FireConfirm('회원가입이 완료되었습니다.');
        navigate('/login');
      }
    });
  };
  // #################################################
  // 전체 검증 로직입니다. 하위 호환을 위해 아래와 같이 추가 작성하였습니다.
  useEffect(() => {
    if (message) return;
    if (password2.length > 4 && password !== password2) {
      setMessage('비밀번호가 일치하지 않습니다');
    }

    if ((password.length < 8 && password.length > 0) || password.length > 16) {
      setMessage('비밀번호는 8자 이상 16자 이하입니다.');
    }
    if (password.length >= 8) {
      if (
        !password.match(
          // /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&]{8,16}/,
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
        )
      ) {
        setMessage('비밀번호는 영대소문자/숫자/특수문자를 사용해주세요.');
        setPasswordMatch(false);
      }
    }
    if (nickname.length > 1) {
      if (nickname.length > 16) {
        setMessage('닉네임은 2~16글자 입니다.');
      } else if (
        !nickname.match(/^(?=.*[a-z0-9ㄱ-ㅎ가-힣])[a-z0-9ㄱ-ㅎ가-힣]{2,16}$/)
      ) {
        setMessage('닉네임에 특수문자를 사용할 수 없습니다.');
      }
    }
    if (needCheck) {
      return setMessage('이메일 인증을 완료해주세요');
    }
  }, [message]);
  return (
    <FormWrapper>
      {!message ? (
        <StyledMessage></StyledMessage>
      ) : (
        <StyledMessage>{message}</StyledMessage>
      )}
      <InputWrapper>
        {isLoading ? (
          <img alt="Spinner" src="/assets/spinner.gif" className="Spinner" />
        ) : (
          <></>
        )}
        <RequiredWrapper>
          <Input
            placeholder={'이메일 아이디'}
            type="email"
            name="email"
            value={email}
            onChange={onChangeHandler}
          />
          <span>*</span>
        </RequiredWrapper>
        <RightTag>
          {needCheck ? (
            <button type="button" onClick={() => onChekingEmail()}>
              인증하기
            </button>
          ) : (
            <></>
          )}
          {confirmingEmail ? (
            <ConfirmModal>
              <StyledIcon
                onClick={() => {
                  setConfirmingEmail(false);
                }}
              >
                <AiOutlineClose />
              </StyledIcon>
              <ConfirmForm
                onConfirmed={onConfirmed}
                confirmCode={confirmCode}
              ></ConfirmForm>
            </ConfirmModal>
          ) : (
            <></>
          )}
        </RightTag>
        <RequiredWrapper>
          <Input
            placeholder={'닉네임'}
            type="text"
            name="nickname"
            value={nickname}
            onChange={onChangeHandler}
          />
          <span>*</span>
        </RequiredWrapper>
        <RequiredWrapper>
          <Input
            placeholder={'비밀번호'}
            type="password"
            name="password"
            value={password}
            onChange={onChangeHandler}
          />
          <span>*</span>
        </RequiredWrapper>
        <RequiredWrapper>
          <Input
            placeholder={'비밀번호 확인'}
            type="password"
            name="password2"
            value={password2}
            onChange={onChangeHandler}
          />
          <span>*</span>
        </RequiredWrapper>
      </InputWrapper>
      {isConfirmed &&
      nicknameMatch &&
      passwordMatch &&
      password === password2 ? (
        <button onClick={onSignup}>가입하기</button>
      ) : (
        <button
          style={{
            backgroundColor: `#D3D3D3`,
            cursor: 'default',
          }}
        >
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

  animation: 0.8s ease-in ${loadEffect.left};

  .Spinner {
    position: absolute;
  }
  & > div:first-child {
    font-size: 0.8rem;
    font-weight: bold;
    color: ${(props) => props.theme.color.redColor};
  }

  & > button {
    background-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.whiteColor};
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
    box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  font-size: large;
  right: 0.7rem;
  top: 0.7rem;
  color: ${(props) => props.theme.color.primary};
  cursor: pointer;
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
  top: 21.5%;
  right: 3%;
  & > button {
    background-color: ${(props) => props.theme.color.greenColor};
    color: ${(props) => props.theme.color.whiteColor};
    font-size: 0.7rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
    box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  }
`;

const ConfirmModal = styled.div`
  position: absolute;
  right: -5%;
  top: -200%;
  background-color: ${(props) => props.theme.color.whiteColor};
  border: 0.3rem solid ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem;
  width: 22rem;
  height: 22rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;

const StyledMessage = styled.div`
  position: absolute;
  top: 3.2rem;
`;

const RequiredWrapper = styled.div`
  display: flex;
  & > span {
    position: absolute;
    color: ${(props) => props.theme.color.primary};
  }
`;

export default SignupForm;
