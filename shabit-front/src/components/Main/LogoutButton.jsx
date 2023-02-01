import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Services from '../../services';
import { theme } from '../../styles/GlobalStyles';

const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <ButtonContainer>
      <StyledButton
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
      </StyledButton>
    </ButtonContainer>
  );
};

export default LogoutButton;
const StyledButton = styled.button`
  margin-top: 0.5rem;
  background-color: ${theme.color.primary};
  color: ${theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;
