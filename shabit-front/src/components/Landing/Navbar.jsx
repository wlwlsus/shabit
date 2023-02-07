import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';

const Navbar = () => {
  const [clicked, setClicked] = useState([0, 0, 0]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const themeContext = useContext(ThemeContext);

  const logoColor = Number(localStorage.getItem('theme')) ? 'black' : 'pink';

  useEffect(() => {
    switch (currentUrl) {
      case '/':
        setClicked([0, 0, 1]);
        break;
      case '/login':
        setClicked([1, 0, 0]);
        break;
      case '/signup':
        setClicked([0, 1, 0]);
        break;
      default:
        setClicked([0, 0, 0]);
        break;
    }
  }, [currentUrl]);

  return (
    <NavWrapper>
      <Logo color={logoColor} size={'sm'} />

      <NavContent>
        <IconWrapper
          style={{
            color: clicked[2]
              ? themeContext.color.primary
              : themeContext.color.grayColor,
          }}
          onClick={() => {
            navigate('/');
          }}
        >
          <RiBookmark2Line />
          <div>앱소개</div>
        </IconWrapper>
        <IconWrapper
          onClick={() => {
            navigate('/login');
          }}
          style={{
            color: clicked[0]
              ? themeContext.color.primary
              : themeContext.color.grayColor,
          }}
        >
          <RiUser3Line />
          <div>로그인</div>
        </IconWrapper>

        <IconWrapper
          style={{
            color: clicked[1]
              ? themeContext.color.primary
              : themeContext.color.grayColor,
          }}
          onClick={() => {
            navigate('/signup');
          }}
        >
          <RiUserAddLine />
          <div>회원가입</div>
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
  font-size: 0.6rem;
  font-weight: bold;

  transition: all 0.2s linear;

  &:hover {
    cursor: pointer;
    transform: scale(1.11);
    color: ${(props) => props.theme.color.primary};
  }

  & > svg {
    font-size: 1.5rem;
  }
`;

export default Navbar;
