import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Services from '../../services';

const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        sessionStorage.clear();
        navigate('/');
        // Services.Auth.logout(
        //   sessionStorage.getItem('accessToken'),
        //   sessionStorage.getItem('refreshToken'),
        // )
      }}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
const Button = styled.button`
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;
