import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeTest = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Home</div>
      <button onClick={() => navigate(`/login`)}>로그인</button>
      <button onClick={() => navigate(`/register`)}>회원가입</button>
    </div>
  );
};

export default HomeTest;
