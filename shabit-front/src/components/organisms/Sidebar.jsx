import React from 'react';
import styled from 'styled-components';

import Logo from '../atoms/Logo';
import SideMenu from '.././molecules/SideMenu';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo color={'pink'} size={'sm'}></Logo>
      <SideMenu></SideMenu>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ;
  align-items: center;
`;

export default Sidebar;
