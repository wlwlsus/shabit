import axios from 'axios';
import React from 'react';
import Services from '../../services';

axios.post('/api/v1/user/logout');

const LogoutButton = () => {
  return (
    <button onClick={() => axios.post('/api/v1/user/logout')}>
      LogoutButton
    </button>
  );
};

export default LogoutButton;
