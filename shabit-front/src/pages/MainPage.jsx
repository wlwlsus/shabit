import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setTokenState, setUserState } from '../store/authSlice';
// import { typedUseSelector } from '../store';
import MoveToAdmin from '../components/Admin/MoveToAdmin';
import GoalModal from '../components/Main/GoalModal'

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const style = {
    backgroundColor: themeContext.color.whiteColor,
    color: themeContext.color.grayColor,
  };
  const [clicked, setClicked] = useState(0);

  const tabClicked = (value) => {
    setClicked(value);
    if (value === 0) {
      navigate('/main');
    } else if (value === 1) {
      navigate('/main/history');
    } else {
      navigate('/main/analyze');
    }
  };

const goalModal = useSelector((state) => {
  return state.goal.goalModal;
});

  return (
    <PageWrapper>
      {goalModal && <GoalModal />}
      <ContainerWrapper>
        <Tab
          onClick={() => {
            navigate('/main');
          }}
          style={clicked[0] ? style : null}
        >
          SHabit
        </Tab>
        <Tab
          onClick={() => {
            navigate('/main/history');
          }}
          style={clicked[1] ? style : null}
        >
          자세기록
        </Tab>
        <Tab onClick={() => tabClicked(2)} style={clicked === 2 ? null : style}>
          자세분석
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
    left: 7.6%;
  }

  & > button:nth-child(3) {
    left: 16%;
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
