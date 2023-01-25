import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Logo from '../common/Logo';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';

const Navbar = () => {
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
    <NavWrapper>
      <Logo color={'pink'} size={'sm'} />
      <NavContent>
        <IconWrapper onClick={toLogin}>
          <RiUser3Line />
          <div>로그인</div>
        </IconWrapper>
        <IconWrapper onClick={toSignup}>
          <RiUserAddLine />
          <div>회원가입</div>
        </IconWrapper>
        <IconWrapper onClick={toIntro}>
          <RiBookmark2Line />
          <div>앱소개</div>
        </IconWrapper>
      </NavContent>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NavContent = styled.div``;

const IconWrapper = styled.div``;

export default Navbar;
