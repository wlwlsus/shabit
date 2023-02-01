import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { HiArrowRightCircle } from 'react-icons/hi2';

import { loadEffect } from '../common/animation';

const StartForm = () => {
  return (
    <Wrapper>
      <span>지금 바로 시작하기</span>
      <HiArrowRightCircle />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  animation: 0.8s ease-in ${loadEffect.left};

  & > span {
    color: ${theme.color.primary};
    font-weight: bold;
  }

  & > svg {
    color: ${theme.color.primary};
    font-size: 3rem;
    transition: all 0.2s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

export default StartForm;
