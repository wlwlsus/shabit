import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Container from '../components/atoms/Container';
import Tab from '../components/molecules/Tab';

export default function MainPage() {
  return (
    <PageWrapper>
      <ContainerWrapper>
        <Tab text={'Shabit'} size={'md'} />
        <Tab text={'자세 기록'} size={'md'} />
        <Container size={'lg'} shadow={'shadow'} border={'main'}>
          <Outlet />
        </Container>
      </ContainerWrapper>
    </PageWrapper>
  );
}

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & > button:first-child {
    position: absolute;
    top: -8%;
    left: 0;
  }

  & > button:nth-child(2) {
    position: absolute;
    top: -8%;
    left: 8.5%;
  }

  & > div:last-child {
    z-index: 0;
  }
`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
