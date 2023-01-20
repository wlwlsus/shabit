import React, { useCallback, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import Services from '../../services';
import apiRequest from '../../utils/apiRequest';

const RegisterForm = ({ setIsLogginIn }) => {
  //전체: 회원가입 폼의 인풋 태그를 관리합니다.
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: '',
    emailCheck: '',
  });

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

  // #################################################
  //feat/#51 : 회원가입을 요청합니다.
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password === password2) {
      Services.Auth.register(email, nickname, password);
    } else {
      setMessage('비밀번호가 일치하지 않습니다');
    }
  };

  //feat/#51 : 비밀번호와 확인용 비밀번호의 일치 여부를 파악합니다.
  const debouncedPasswordConfirm = useDebounce(password2, 300);
  useEffect(() => {
    if (debouncedPasswordConfirm) {
      if (password !== password2) {
        setMessage('비밀번호가 일치하지 않습니다');
      }
    }
  }, [debouncedPasswordConfirm]);

  //feat/#28 : 이메일 중복 여부를 체크합니다.
  const debouncedEmailTerm = useDebounce(email, 300);
  const checkDuplicated = (email) => {
    apiRequest
      .get(`/user/${email}`)
      .then((res) => {
        setMessage('사용가능한 아이디입니다.');
      })
      .catch((err) => {
        setMessage('중복된 아이디입니다.');
      });
  };
  useEffect(() => {
    if (debouncedEmailTerm.includes('@') && debouncedEmailTerm.includes('.')) {
      checkDuplicated(debouncedEmailTerm);
    } else if (debouncedEmailTerm) {
      setMessage('유효한 이메일이 아닙니다.');
    }
  }, [debouncedEmailTerm]);

  // ##################################################
  //feat/#26 : 이메일 인증을 요청합니다.
  const [emailCode, setEmailCode] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  //feat/#26 이메일 인증이 완료되면 이메일 인풋폼을 Diabled합니다.
  const [isDisabled, setIsDisabled] = useState(false);

  //feat/#26 : API에 요청하여 이메일 인증코드를 받습니다.
  const onCheckCode = (e) => {
    e.preventDefault();
    apiRequest.get(`/email/${email}`, { email }).then((res) => {
      setEmailCode(res.data.result.code);
    });
  };

  //feat/#26 : 이메일 인증 코드를 비교합니다..
  const onChecking = () => {
    console.log(emailCode);
    console.log(emailCheck);
    if (emailCheck === emailCode) {
      setEmailChecked(true);
      setIsDisabled(true);
      setEmailCode('');
    } else {
      setMessage('인증코드가 일치하지 않습니다.');
    }
  };

  // ##################################################
  return (
    <div>
      {message}
      <form style={{ width: '600px' }} onSubmit={onSubmitHandler}>
        <br />
        <label htmlFor="emailInput">email</label>
        {!emailCode ? (
          <>
            {emailChecked ? (
              <div>
                이메일이 인증되었습니다.
                <br />
              </div>
            ) : (
              <div></div>
            )}
            <input
              type="email"
              name="email"
              id="emailInput"
              placeholder="name@example.com"
              value={email}
              onChange={onChangeHandler}
              disabled={isDisabled}
            />
            {/* <button type="button" onClick={onEmailCheck}>
              이메일 중복확인
            </button> */}
            <button type="button" onClick={onCheckCode}>
              이메일 인증하기
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="emailCheck"
              id="emailCheckInput"
              placeholder="emailCheck"
              value={emailCheck}
              onChange={onChangeHandler}
            />
            <button type="button" onClick={onChecking}>
              인증완료하기
            </button>
            <button type="button" onClick={onCheckCode}>
              인증번호 재전송하기
            </button>
          </>
        )}

        <br />
        <label htmlFor="nicknameInput">nickname</label>
        <input
          type="text"
          name="nickname"
          id="nicknameInput"
          placeholder="nickname"
          value={nickname}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="passwordInput">password</label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          placeholder="password"
          value={password}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="password2Input">confirm password</label>
        <input
          type="password"
          name="password2"
          id="password2Input"
          placeholder="confirm password"
          value={password2}
          onChange={onChangeHandler}
        />
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default RegisterForm;
