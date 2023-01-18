import React, { useCallback, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

const RegisterForm = ({ setIsLogginIn }) => {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: '',
    emailCheck: '',
  });
  const [message, setCurrentMessage] = useState('');
  const setMessage = (str) => {
    setCurrentMessage(str);
    setTimeout(() => {
      setCurrentMessage('');
    }, 2000);
  };
  const [emailCode, setEmailCode] = useState('');
  // const [isCodeChecking, setIsCodeChecking] = useState(false);
  const { email, nickname, password, password2, emailCheck } = inputs;
  const [emailChecked, setEmailChecked] = useState(false);
  // const [checkingMessage, setChekingMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [duplMessge, setDuplMessge] = useState('');
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const api = {
    post() {
      return Promise.resolve({ msg: '가짜api 성공' });
    },
    get() {
      return Promise.resolve({
        msg: '가짜api 성공',
        data: { result: { code: '1234' } },
      });
    },
    patch() {
      return Promise.resolve({ msg: '가짜API 성공' });
    },
    put() {
      return Promise.resolve({ msg: '가짜api 성공' });
    },
    delete() {
      return Promise.resolve({ msg: '가짜api성공' });
    },
  };

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password === password2) {
      api
        .post('/user', { email, nickname, password })
        .then((res) => {
          setMessage((res.msg || res.data.msg) + '회원가입');
          setIsLogginIn(true);
        })
        .catch((err) => {
          console.log(err);
          setMessage((err.msg || err.data.msg) + '에러회원가입');
        });
    } else {
      setMessage('비밀번호가 일치하지 않습니다');
    }
  };

  // const onEmailCheck = (e) => {
  //   e.preventDefault();
  //   api
  //     .get(`/user/${email}`)
  //     .then((res) => {
  //       setMessage((res.msg || res.data.msg) + '이메일 체크');
  //     })
  //     .catch((err) => {
  //       setMessage((err.msg || err.data.msg) + '이메일 체크');
  //     });
  // };
  const onCheckCode = (e) => {
    e.preventDefault();
    api.get('/email/{email}', { email }).then((res) => {
      setEmailCode(res.data.result.code);
    });
  };

  const debouncedEmailTerm = useDebounce(email, 300);
  const checkDuplicated = (email) => {
    api
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

  const debouncedPasswordConfirm = useDebounce(password2, 300);
  useEffect(() => {
    if (debouncedPasswordConfirm) {
      if (password !== password2) {
        setMessage('비밀번호가 일치하지 않습니다');
      }
    }
  }, [debouncedPasswordConfirm]);

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
              <div>{duplMessge}</div>
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
