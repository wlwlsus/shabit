import React from 'react';
import Services from '../../services';

const LogoutButton = () => {
  return (
    <button
      onClick={() =>
        Services.Auth.logout(
          localStorage.getItem('accessToken'),
          localStorage.getItem('refreshToken'),
        )
      }
    >
      LogoutButton
    </button>
  );
};

export default LogoutButton;
