import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/GlobalStyles';

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
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 0;
`;

const NavContent = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 0;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.color.grayColor};
  font-size: 0.6rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  & > svg {
    font-size: 1.5rem;
  }
`;

export default Navbar;
