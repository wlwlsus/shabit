import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';

import { FiAlertCircle } from 'react-icons/fi';
import { BsFillCaretRightSquareFill } from 'react-icons/bs';

export default function MainInfo({ randomQuote }) {
  return (
    <Wrapper>
      <InfoBox>
        <InfoTitle>
          <FiAlertCircle />
          알고 계셨나요?
        </InfoTitle>

        
        <div>
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dicta
          facere odit ad, at, illum neque soluta optio assumenda reprehenderit
          ullam, accusantium molestiae impedit natus iusto quod fugit asperiores
          dolorum! */}
          {randomQuote}
        </div>
      </InfoBox>

      <Start>
        <BsFillCaretRightSquareFill />
        <div>자세교정 시작하기</div>
      </Start>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};
  border: 0.2rem solid ${theme.color.secondary};
  padding: 1.5rem 1rem;

  display: flex;
  justify-content: space-evenly;

  animation: 0.8s ease-in ${loadEffect.down};
`;

const InfoBox = styled.div`
  width: 60%;
  color: ${theme.color.primary};
  font-size: 1.1rem;
  font-weight: 600;

  & > div:last-child {
    width: 20rem;
    height: 5.5rem;
    overflow: hidden;
    word-wrap: break-word;
  }
`;

const InfoTitle = styled.div`
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
  background-color: ${theme.color.secondary};
  border-radius: 1.5rem;
  border: 0.1rem solid ${theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};

  display: flex;
  align-items: center;
`;

const Start = styled.div`
  color: ${theme.color.primary};
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};
  border: 0.2rem solid ${theme.color.secondary};
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    transition: all 0.2s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }

  & > div {
    font-size: 0.7rem;
    font-weight: bold;
  }
`;
