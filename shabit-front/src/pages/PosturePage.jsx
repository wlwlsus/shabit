import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import Modal from '../components/Posture/Modal';

import Logo from '../components/common/Logo';

import { useDispatch } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';
export default function PosturePage() {
  const [stretchModal, setStretchModal] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    // if (!accessToken && !user) {
    //   return navigate('/login');
    // }
    dispatch(setTokenState(accessToken));
    dispatch(setUserState(user));
  }, [navigate, dispatch]);

  return (
    <PageWrapper>
      {stretchModal && <Modal setModal={setStretchModal} />}
      <Container>
        <Logo color={'pink'} size={'sm'} />
        <Outlet />
      </Container>
      <Sidebar />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 53rem;
  height: 33rem;
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem 0 0 1.5rem;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.grayColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  position: relative;

  & > img {
    position: absolute;
    top: 3%;
    left: 1%;
  }
`;

const Sidebar = styled.div`
  width: 8rem;
  height: 33rem;
  background-color: ${theme.color.primary};
  border-radius: 0 1.5rem 1.5rem 0;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.grayColor};
`;
