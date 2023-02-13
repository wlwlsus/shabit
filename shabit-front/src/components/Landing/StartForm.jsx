import React from 'react';
import styled from 'styled-components';
import { HiArrowRightCircle } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { loadEffect } from '../../styles/animation';

const StartForm = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Slogan>
        <p>
          <span>&#10003; 척추 건강</span>을 위한
        </p>
        <p>
          <span>&#10003; 좋은 습관</span> 만들기
        </p>
        <p>
          <span>SHabit</span> 과 함께 하실래요?
        </p>
      </Slogan>
      <Start>
        지금 바로 시작하기{' '}
        <HiArrowRightCircle onClick={() => navigate('/login')} />
      </Start>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  font-weight: 800;

  animation: 0.8s ease-in ${loadEffect.left};
`;

const Slogan = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5rem;

  color: ${(props) => props.theme.color.secondary};

  & > p {
    & > span {
      color: ${(props) => props.theme.color.primary};
      -webkit-text-stroke: 0;
    }
  }
`;

const Start = styled.div`
  color: ${(props) => props.theme.color.primary};
  display: flex;
  align-items: center;
  font-size: 1.2rem;

& > svg {
  font-size: 3rem;
  transition: all 0.2s linear;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default StartForm;
