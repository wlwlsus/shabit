import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

import Navbar from '../components/Landing/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';

export default function LandingPage({ children }) {
  const [content, form] = children;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setTokenState(accessToken));
    dispatch(setUserState(user));
    if (accessToken && user) {
      navigate('/main');
    }
  }, [navigate, dispatch]);
  return (
    <PageWrapper>
      <ContainerWrapper>
        <NavContainer>
          <Navbar />
        </NavContainer>
        <ContentContainer>{content}</ContentContainer>
        <FormContainer>{form}</FormContainer>
      </ContainerWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NavContainer = styled.div`
  width: 28rem;
  height: 25rem;
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem;
`;

const ContentContainer = styled.div`
  width: 27rem;
  height: 27rem;
  background-color: ${theme.color.primary};

  position: absolute;
  left: 12%;
`;

const FormContainer = styled(NavContainer)`
  margin-left: 2.5rem;
`;
