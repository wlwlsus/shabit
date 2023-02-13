import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Posture/Modal';
import VideoModal from "../components/TeachableMachineTest/VideoModal";
import Sidebar from '../components/Posture/Sidebar';
import Logo from '../components/common/Logo';

import { useDispatch,useSelector } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';

export default function PosturePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVideoModalOpen = useSelector((state)=>{
    return state.tracking.videoModal;
  })
  const isStretchModalOpen = useSelector((state)=>{
    return state.video.stretchModal;
  })
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
      {isStretchModalOpen&&<Modal/>}
      {isVideoModalOpen &&< VideoModal/>}
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
  width: 62rem;
  height: 36rem;
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem 0 0 1.5rem;
  box-shadow: 0 0.1rem 0.2rem ${(props) => props.theme.color.grayColor};

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
