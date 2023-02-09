import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Posture/Modal';
import Sidebar from '../components/Posture/Sidebar';
import Logo from '../components/common/Logo';

export default function PosturePage() {
  const [stretchModal, setStretchModal] = useState(true);

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
