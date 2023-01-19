import React from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';

const LandingSidebar = () => {
  return (
    <ButtonWrapper>
      <Button icon={<RiUser3Line />} color={'gray'} size={'md'} />
      <Button icon={<RiUserAddLine />} color={'gray'} size={'md'} />
      <Button icon={<RiBookmark2Line />} color={'gray'} size={'md'} />
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 20%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default LandingSidebar;
