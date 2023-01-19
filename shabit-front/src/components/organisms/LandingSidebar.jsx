import React from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';
import Logo from '../molecules/Logo';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo color={'pink'} size={'sm'}></Logo>
      <Button icon={<RiUser3Line />} color={'gray'} size={'md'}></Button>
      <Button icon={<RiUserAddLine />} color={'gray'} size={'md'}></Button>
      <Button icon={<RiBookmark2Line />} color={'gray'} size={'md'}></Button>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  width: 25%;
  height: 100%;

  padding-bottom: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export default Sidebar;
