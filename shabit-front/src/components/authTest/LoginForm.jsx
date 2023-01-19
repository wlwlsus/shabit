import React, { useCallback, useEffect, useState } from 'react';
import Services from '../../services';
import apiRequest from '../../utils/apiRequest';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [message, setCurrentMessage] = useState('');
  const setMessage = (str) => {
    setCurrentMessage(str);
    setTimeout(() => {
      setCurrentMessage('');
    }, 2000);
  };
  const { email, password } = inputs;
  const [isResetPassword, setIsResetPassword] = useState(false);
  const toggleReset = (e) => {
    e.preventDefault();
    setIsResetPassword(!isResetPassword);
  };

  const onReset = async (e) => {
    e.preventDefault();
    if (await Services.Auth.resetPassword(email)) {
      await setMessage('비밀번호가 초기화되었습니다');
    }
    await setIsResetPassword(false);
    // api.put(`/user/${email}`).then(() => {
    //   setMessage('비밀번호가 초기화되었습니다');
    //   setIsResetPassword(false);
    // });
  };

  // const [autoLogin, setAutoLogin] = useState(false)
  /**
   * 자동 로그인 로직
   * 1. 자동 로그인이 체크되면 setAutoLogin을 true로 한다.
   * 2. 로그인 요청을 보내고 응답을 받는다.
   * 3. 받은 응답을 처리할 때에, autoLogin이 true이면 새로운 쿠키(autoLoginAccessToken)???를 만든다.
   *
   * 0. useEffect를 이용해서, 최초 로그인 시, autoLoginAccessToken을 조회해서 값이 있으면 해당 토큰으로 요청을 보낸다.
   */

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    apiRequest
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
      {!isResetPassword ? (
        <>
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
          <p onClick={toggleReset}>비밀번호를 잊으셨나요?</p>
        </>
      ) : (
        <>
          <form onSubmit={onReset}>
            <label htmlFor="emailInput">email</label>
            <input
              type="email"
              name="email"
              id="emailInputforReset"
              placeholder="name@example.com"
              value={email}
              onChange={onChangeHandler}
            />
            <br />
            <button type="submit">비밀번호 초기화하기</button>
          </form>
          <p onClick={toggleReset}>로그인하러 가기</p>
        </>
      )}
    </div>
  );
};

export default LoginForm;
