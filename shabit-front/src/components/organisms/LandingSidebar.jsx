import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Logo from '../molecules/Logo';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';
import { theme } from '../../styles/GlobalStyles';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo color={'pink'} size={'sm'}></Logo>
      <Label
        icon={<RiUser3Line />}
        color={theme.color.grayColor}
        size={'md'}
      ></Label>
      <Label
        icon={<RiUserAddLine />}
        color={theme.color.grayColor}
        size={'md'}
      ></Label>
      <Label
        icon={<RiBookmark2Line />}
        color={theme.color.grayColor}
        size={'md'}
      ></Label>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default Sidebar;
