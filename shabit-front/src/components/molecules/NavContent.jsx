import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Icon from '../atoms/Icon';
import Label from '../atoms/Label';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';

const NavContent = () => {
  const navigate = useNavigate();

  const toIntro = () => {
    navigate('/');
  };

  const toLogin = () => {
    navigate('/login');
  };

  const toSignup = () => {
    navigate('/signup');
  };

  return (
    <Wrapper>
      <Label text={'로그인'} color={'gray'} size={'xs'} onClick={toLogin}>
        <Icon icon={<RiUser3Line />} color={'gray'} size={'md'} />
      </Label>

      <Label text={'회원가입'} color={'gray'} size={'xs'} onClick={toSignup}>
        <Icon icon={<RiUserAddLine />} color={'gray'} size={'md'} />
      </Label>

      <Label text={'앱소개'} color={'gray'} size={'xs'} onClick={toIntro}>
        <Icon icon={<RiBookmark2Line />} color={'gray'} size={'md'} />
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  & > label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default NavContent;
