import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LandingTest = () => {
  const [isLogginIn, setIsLogginIn] = useState(true);

  return (
    <div>
      {isLogginIn ? (
        <LoginForm />
      ) : (
        <RegisterForm setIsLogginIn={setIsLogginIn} />
      )}
      <div
        onClick={() => {
          setIsLogginIn(!isLogginIn);
        }}
      >
        {isLogginIn ? '새로운 계정 만드쉴?' : '기존 계정으로 로그인 할거임?'}
      </div>
    </div>
  );
};

export default LandingTest;
