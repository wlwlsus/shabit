import React from 'react';
import styled from 'styled-components';

import Container from '../atoms/Container';
import Logo from '../molecules/Logo';
import Button from '../atoms/Button';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';

const LandingSidebar = () => {
  return (
    <Container shadow={'shadow'} border={'rounded'} size={'md'}>
      <Logo color={'pink'} size={'sm'}></Logo>
      <ButtonWrapper>
        <Button icon={<RiUser3Line />} color={'gray'} size={'md'} />
        <Button icon={<RiUserAddLine />} color={'gray'} size={'md'} />
        <Button icon={<RiBookmark2Line />} color={'gray'} size={'md'} />
      </ButtonWrapper>
    </Container>
  );
};
const ButtonWrapper = styled.div`
  width: 18%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export default LandingSidebar;
