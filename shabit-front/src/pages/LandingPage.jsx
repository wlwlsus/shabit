import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

import Navbar from '../components/Landing/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';
import { loadEffect } from '../components/common/animation';

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
      // navigate('/main'); 로그인 됐을때 이동시키는 로직입니다. 임시 비활성화
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

  &:hover {
    cursor: default;
  }
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NavContainer = styled.div`
  width: 7rem;
  height: 25rem;
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem 0 0 1.5rem;
  margin-right: 19rem;

  animation: 0.8s ease-in-out ${loadEffect.right};
`;

const FormContainer = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: ${theme.color.whiteColor};
  border-radius: 0 1.5rem 1.5rem 0;
  margin-left: 8rem;

  animation: 0.8s ease-in ${loadEffect.left};
`;

const ContentContainer = styled.div`
  width: 27rem;
  height: 27rem;
  background-color: ${theme.color.primary};
  position: absolute;
  left: 12%;

  animation: 0.8s ease-in ${loadEffect.down};
`;
