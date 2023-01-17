import React, { useCallback, useState } from 'react';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const { email, password } = inputs;

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
        msg: '로그인 성공',
        accessToken: '엑세스토큰',
        refreshToken: '리프레시토큰',
        user: {
          email: 'ssafy@ssafy.com',
          nickname: 'ssafy',
          color: 'default',
          image: 'default',
        },
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    api
      .get('/user', { email, password })
      .then((res) => {
        setMessage(res.msg || res.data.msg);
        localStorage.setItem(
          'accessToken',
          res.accessToken || res.data.accessToken,
        );
        localStorage.setItem(
          'refreshToken',
          res.refreshToken || res.data.refreshToken,
        );
        localStorage.setItem('user', JSON.stringify(res.user || res.data.user));
      })
      .catch((err) => {
        console.log(err.status || err.data.status);
        setMessage(err.msg || err.data.msg);
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
