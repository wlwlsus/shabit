import React from 'react';
import styled from 'styled-components';

import Logo from '../atoms/Logo';
import NavContent from '../molecules/NavContent';

const Navbar = () => {
  return (
    <Wrapper>
      <Logo color={'pink'} size={'sm'} />
      <NavContent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  & > img:first-child {
    margin-bottom: 2.5rem;
  }
`;

export default Navbar;
