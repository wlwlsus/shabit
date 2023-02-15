import React from 'react';
import styled from 'styled-components';
import {
  themeColor,
  pinkTheme,
  darkTheme,
  blueTheme,
  greenTheme,
} from '../../styles/GlobalStyles';

export default function ThemeBox({ setTheme }) {
  const themeList = [pinkTheme, darkTheme, blueTheme, greenTheme];

  const changeTheme = (value) => {
    localStorage.setItem('theme', value);
    setTheme(themeList[value]);
  };

  return (
    <Wrapper>
      <span>테마</span>
      <Pink onClick={() => changeTheme(0)}>PINK</Pink>
      <Dark onClick={() => changeTheme(1)}>PURPLE</Dark>
      <Blue onClick={() => changeTheme(2)}>BLUE</Blue>
      <Green onClick={() => changeTheme(3)}>GREEN</Green>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.div`
  border-radius: 0.3rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  padding: 0.3rem;
  font-size: 0.7rem;
  line-height: 0.7rem;
  font-weight: bold;

  transition: all 0.2s linear;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Dark = styled(Button)`
  border: 0.1rem solid ${themeColor.darkPrim};
  color: ${themeColor.darkPrim};
  background-color: ${themeColor.darkSec};
`;

const Blue = styled(Button)`
  border: 0.1rem solid ${themeColor.bluePrim};
  color: ${themeColor.bluePrim};
  background-color: ${themeColor.blueSec};
`;

const Pink = styled(Button)`
  border: 0.1rem solid ${themeColor.pinkPrim};
  color: ${themeColor.pinkPrim};
  background-color: ${themeColor.pinkSec};
`;

const Green = styled(Button)`
  border: 0.1rem solid ${themeColor.greenPrim};
  color: ${themeColor.greenPrim};
  background-color: ${themeColor.greenSec};
`;
