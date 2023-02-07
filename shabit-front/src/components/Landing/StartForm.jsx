import React from 'react';
import styled from 'styled-components';
import { HiArrowRightCircle } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { loadEffect } from '../common/animation';

const StartForm = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <span>지금 바로 시작하기</span>
      <HiArrowRightCircle onClick={() => navigate('/login')} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  animation: 0.8s ease-in ${loadEffect.left};

  & > span {
    color: ${(props) => props.theme.color.primary};
    font-weight: bold;
  }

  & > svg {
    color: ${(props) => props.theme.color.primary};
    font-size: 3rem;
    transition: all 0.2s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

export default StartForm;
