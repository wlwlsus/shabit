import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/GlobalStyles';
import { loadEffect } from '../../common/animation';

const QuoteCard = ({ quote }) => {
  return (
    <Wrapper>
      <InfoBox>
        {/* <InfoTitle>알고 계셨나요?</InfoTitle> */}
        <div>{quote}</div>
      </InfoBox>
    </Wrapper>
  );
};

export default QuoteCard;

const Wrapper = styled.div`
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem;
  /* box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor}; */
  border: 0.2rem solid ${theme.color.secondary};
  padding: 1.5rem 1rem;
  margin: 0.5rem;
  display: flex;
  /* justify-content: space-evenly; */

  animation: 0.8s ease-in ${loadEffect.down};
`;

const InfoBox = styled.div`
  width: 60%;
  color: ${theme.color.primary};
  font-size: 1.1rem;
  font-weight: 600;

  & > div:last-child {
    width: 26rem;
    height: 4rem;
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
