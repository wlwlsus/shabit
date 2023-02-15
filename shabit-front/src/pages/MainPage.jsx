import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import GoalModal from '../components/Main/GoalModal';
import PasswordModal from '../components/Main/PasswordModal';

export default function MainPage() {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const style = {
    backgroundColor: themeContext.color.whiteColor,
    color: themeContext.color.grayColor,
  };
  const [clicked, setClicked] = useState(0);

  const goalModal = useSelector((state) => {
    return state.goal.goalModal;
  });
  const passwordModal = useSelector((state) => {
    return state.auth.passwordModal;
  });

  return (
    <PageWrapper>
      {goalModal && <GoalModal />}
      {passwordModal && <PasswordModal />}
      <ContainerWrapper>
        <Tab
          onClick={() => {
            navigate('/main');
            setClicked(0);
          }}
          style={clicked === 0 ? null : style}
        >
          SHabit
        </Tab>
        <Tab
          onClick={() => {
            navigate('/main/history');
            setClicked(1);
          }}
          style={clicked === 1 ? null : style}
        >
          자세기록
        </Tab>
        <Tab
          onClick={() => {
            navigate('/main/goal');
            setClicked(2);
          }}
          style={clicked === 2 ? null : style}
        >
          나의목표
        </Tab>
        <Tab
          onClick={() => {
            navigate('/main/gallery');
            setClicked(3);
          }}
          style={clicked === 3 ? null : style}
        >
          갤러리
        </Tab>
        <Container>
          <Outlet />
        </Container>
      </ContainerWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
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

  & > button {
    transition: all 0.3s ease-in-out;
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }

  & > button:first-child {
    left: 0.2%;
  }

  & > button:nth-child(2) {
    left: 7.8%;
  }
  & > button:nth-child(3) {
    left: 16%;
  }

  & > button:nth-child(4) {
    left: 24%;
  }
`;

const Container = styled.div`
  width: 70rem;
  height: 36rem;
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 0 1.5rem 1.5rem;
  padding: 2rem;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.grayColor};

  z-index: 0;
`;

const Tab = styled.button`
  width: 6rem;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.secondary};
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 0.7rem;
  padding: 1rem;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  position: absolute;
  top: -6.5%;
`;
