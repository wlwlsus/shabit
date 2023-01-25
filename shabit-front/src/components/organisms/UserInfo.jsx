import React from 'react';
import styled from 'styled-components';

import Container from '../atoms/Container';
import Text from '../atoms/Text';
import UserImg from '../molecules/UserImg';
import ThemeBox from '../molecules/ThemeBox';

export default function UserInfo() {
  return (
    <Wrapper>
      <UserImg />
      <Container border={'rounded'} shadow={'shadow'} edge={'secondary'}>
        <UserName>
          <Text text={'username'} />
          <Text text={'이메일 : ezpz@gmail.com'} />
        </UserName>
        <Container border={'rounded'} shadow={'shadow'} edge={'secondary'}>
          <Text text={'마지막 접속일 : '} color={'primary'} />
        </Container>
        <ThemeBox />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  & > div:first-child {
    position: absolute;
  }
`;

const UserName = styled.div``;
