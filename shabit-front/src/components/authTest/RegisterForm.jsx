import React, { useCallback, useState } from 'react';

const RegisterForm = ({ setIsLogginIn }) => {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState('');
  const { email, nickname, password, password2 } = inputs;

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
      return Promise.resolve({ msg: '가짜api 성공' });
    },
    patch() {
      return Promise.resolve({ mes: '가짜API 성공' });
    },
    put() {
      return Promise.resolve({ msg: '가짜api 성공' });
    },
    delete() {
      return Promise.resolve({ msg: '가짜api성공' });
    },
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

  const onEmailCheck = (e) => {
    e.preventDefault();
    api
      .get(`/user/${email}`)
      .then((res) => {
        setMessage((res.msg || res.data.msg) + '이메일 체크');
      })
      .catch((err) => {
        setMessage((err.msg || err.data.msg) + '이메일 체크');
      });
  };

  return (
    <div>
      {message}
      <form style={{ width: '600px' }} onSubmit={onSubmitHandler}>
        <br />
        <label htmlFor="emailInput">email</label>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="name@example.com"
          value={email}
          onChange={onChangeHandler}
        />
        <button type="button" onClick={onEmailCheck}>
          이메일 중복확인
        </button>

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
