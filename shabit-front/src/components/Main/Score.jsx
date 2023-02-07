import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { loadEffect } from '../common/animation';

import { RxThickArrowRight } from 'react-icons/rx';
import ThemeBox from './ThemeBox';
import Logo from '../common/Logo';

export default function PostureTime() {
  return (
    <Wrapper>
      <ContentWrapper>
        <DataWrapper>
          <Data>
            <P>오늘의 자세</P>
            <Score
            >
              {139}점
            </Score>
          </Data>
        </DataWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const DataWrapper = styled.div`
  animation: 0.8s ease-in ${loadEffect.down};
`;

const P = styled.div`
  color: ${theme.color.blackColor};
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Score = styled.span`
  color: ${theme.color.grayColor};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0.3rem;
  position: relative;
`;

const Data = styled.div`
`;
const Arrow = styled.div`
  color: ${theme.color.secondary};

  & > svg {
    font-size: 3rem;
  }
`;