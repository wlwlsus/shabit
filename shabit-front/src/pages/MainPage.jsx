import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { theme } from '../styles/GlobalStyles';
import { useDispatch } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';
import { typedUseSeletor } from '../store';

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = typedUseSeletor((state) => {
    return state.auth.user;
  });

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (!accessToken && !user.email) {
      return navigate('/login');
    }
    dispatch(setTokenState(accessToken));
    dispatch(setUserState(user));
  }, [navigate, dispatch]);

  useEffect(() => {
    let newUser = user;
    const _setUser = () => {
      if (newUser.email) return;
      else {
        const localUser = JSON.parse(localStorage.getItem('user'));
        newUser = localUser;
        dispatch(setUserState(localUser));
      }
    };
    _setUser();
  }, []);

  return (
    <PageWrapper>
      <ContainerWrapper>
        <Tab>SHabit</Tab>
        <Tab>자세기록</Tab>

        <Container>
          <Outlet />
        </Container>
      </ContainerWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & > button:first-child {
    position: absolute;
    top: -8%;
    left: 0;
  }

  & > button:nth-child(2) {
    position: absolute;
    top: -8%;
    left: 8.5%;
  }

  & > div:last-child {
  }
`;

const Container = styled.div`
  background-color: ${theme.color.whiteColor};
  border-radius: 0 1.5rem 1.5rem;
  padding: 2rem;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.grayColor};

  z-index: 0;
`;

const Tab = styled.button`
  background-color: ${theme.color.whiteColor};
  font-size: 1.1rem;
  font-weight: bold;
  padding: 1.2rem;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};
`;
