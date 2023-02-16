import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Posture/Modal';
import VideoModal from '../components/TeachableMachineTest/VideoModal';
import Sidebar from '../components/Posture/Sidebar';
import Logo from '../components/common/Logo';
import { AiFillNotification } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';
import Webcam from '../components/TeachableMachineTest/Webcam';

export default function PosturePage() {
  const logoColor = Number(localStorage.getItem('theme')) ? 'black' : 'pink';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVideoModalOpen = useSelector((state) => {
    return state.tracking.videoModal;
  });
  const isStretchModalOpen = useSelector((state) => {
    return state.video.stretchModal;
  });

  const curPose = useSelector((state) => {
    return state.pose.pose;
  });

  const stretchingMode = useSelector((state) => {
    return state.video.stretchingMode;
  });

  useEffect(() => {
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    dispatch(setTokenState(accessToken));
    dispatch(setUserState(user));
  }, [navigate, dispatch]);

  return (
    <PageWrapper>
      {isStretchModalOpen && <Modal />}
      {isVideoModalOpen && <VideoModal />}
      <Container>
        <InfoBox>
          <Logo color={logoColor} size={'sm'} />
          {curPose && !stretchingMode && <span> 현재 자세 : {curPose}</span>}
          {stretchingMode && (
            <span>
              <AiFillNotification />
              영상을 보고 따라해보세요.
            </span>
          )}
        </InfoBox>
        <Outlet />
        <Webcam />
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

  &:hover {
    cursor: default;
  }
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
`;

const InfoBox = styled.div`
  width: 45rem;
  height: 3rem;
  background-color: ${(props) => props.theme.color.secondary};
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  border-radius: 1rem;
  font-weight: bold;
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-top: 2rem;

  position: relative;

  & > svg {
    color: ${(props) => props.theme.color.primary};
    margin-right: 1rem;
  }

  & > img {
    position: absolute;
    top: 0;
    left: -15%;
  }
`;
