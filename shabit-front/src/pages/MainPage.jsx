import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../styles/GlobalStyles';
import { useDispatch } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';
import { typedUseSelector } from '../store';
import MoveToAdmin from '../components/Admin/MoveToAdmin';

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = typedUseSelector((state) => {
    return state.auth.user;
  });

  const unClicked = {
    color: theme.color.grayColor,
  };
  const clicked = {
    backgroundColor: theme.color.primary,
    color: theme.color.secondary,
  };
  const [style, setStyle] = useState([clicked, unClicked]);

  const currentUrl = location.pathname;
  useEffect(() => {
    switch (currentUrl) {
      case '/main':
        setStyle([clicked, unClicked]);
        break;
      case '/main/history':
        setStyle([unClicked, clicked]);
        break;
      default:
        setStyle([0, 0]);
        break;
    }
  }, [currentUrl]);

  useEffect(() => {
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    if (!accessToken && !user.email) {
      return navigate('/login');
    }
    dispatch(setTokenState(accessToken));
    dispatch(setUserState(user));
  }, []);

  useEffect(() => {
    let newUser = user;
    const _setUser = () => {
      if (newUser.email) return;
      else {
        const localUser = JSON.parse(sessionStorage.getItem('user'));
        newUser = localUser;
        dispatch(setUserState(localUser));
      }
    };
    _setUser();
  }, []);

  return (
    <PageWrapper>
      <ContainerWrapper>
        <Tab
          onClick={() => {
            navigate('/main');
          }}
          style={style[0]}
        >
          SHabit
        </Tab>
        <Tab
          onClick={() => {
            navigate('/main/history');
          }}
          style={style[1]}
        >
          자세기록
        </Tab>
        <Container>
          <MoveToAdmin />
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

  &:hover {
    cursor: default;
  }
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
  width: 70rem;
  height: 36rem;
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
  line-height: 0.7rem;
  padding: 1.2rem;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};
`;
