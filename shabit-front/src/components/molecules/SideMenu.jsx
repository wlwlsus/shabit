import React from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';
import { theme } from '../../styles/GlobalStyles';

const SideMenu = () => {
  return (
    <SideMenuWrapper>
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
    </SideMenuWrapper>
  );
};

const SideMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default SideMenu;
