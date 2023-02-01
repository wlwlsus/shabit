import React from 'react';
import { useNavigate } from 'react-router-dom';
import Services from '../../services';

const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        console.log(sessionStorage.getItem('accessToken'));
        sessionStorage.clear();
        navigate('/');
        // Services.Auth.logout(
        //   sessionStorage.getItem('accessToken'),
        //   sessionStorage.getItem('refreshToken'),
        // )
      }}
    >
      LogoutButton
    </button>
  );
};

export default LogoutButton;
