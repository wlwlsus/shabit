import React from 'react';
import styled from 'styled-components';

import Container from '../atoms/Container';
import Logo from '../molecules/Logo';
import SidebarBtn from '../molecules/SidebarBtn';

const LandingSidebar = () => {
  return (
    <SidebarWrapper>
      <Container shadow={'shadow'} border={'rounded'} size={'md'}>
        <Logo color={'pink'} size={'sm'} />
        <SidebarBtn />
      </Container>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  & > div {
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export default LandingSidebar;
