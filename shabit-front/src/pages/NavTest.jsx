import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/authTest/LogoutButton';

const NavTest = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/')}>홈</button>||
      <button onClick={() => navigate('/login')}>로그인</button>||
      <button onClick={() => navigate('/register')}>회원가입</button>||
      <button onClick={() => navigate('/main')}>메인</button>||
      <button onClick={() => navigate('/main/chart')}>차트</button>||
      <button onClick={() => navigate('/main/video')}>비디오</button>||
      <LogoutButton />
    </div>
  );
};

export default NavTest;
