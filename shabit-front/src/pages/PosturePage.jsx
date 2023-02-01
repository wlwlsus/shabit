import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

import Logo from '../components/common/Logo';
import Modal from '../components/Posture/Modal';

import { AiFillNotification } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';
export default function PosturePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const user = JSON.parse(localStorage.getItem('user'));
    if (!accessToken && !user) {
      return navigate('/login');
    }
    dispatch(setTokenState(accessToken));
    dispatch(setUserState(user));
  }, [navigate, dispatch]);

  const [modal, setModal] = useState(false);

  const OpenModal = () => {
    setModal(true);
  };

  return (
    <PageWrapper>
      {modal && <Modal setModal={setModal} />}
      <Container>
        <Logo color={'pink'} size={'sm'} />
        <InfoBox>
          <AiFillNotification />
          {!modal && <button onClick={OpenModal}>스트레칭 시이작버튼//</button>}
          영상 보고 따라해보셈
        </InfoBox>
        <Outlet />
      </Container>
      <Sidebar></Sidebar>
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

const InfoBox = styled.div`
  width: 75%;
  height: 8%;
  background-color: ${theme.color.secondary};
  border: 0.1rem solid ${theme.color.primary};
  border-radius: 1rem;
  font-weight: bold;
  padding: 1rem;
  display: flex;
  align-items: center;

  & > svg {
    color: ${theme.color.primary};
  }
`;
