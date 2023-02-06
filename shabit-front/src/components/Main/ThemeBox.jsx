import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

export default function ThemeBox() {
  return (
    <Wrapper>
      <span>테마</span>
      <Button>DARK</Button>
      <Button>BLUE</Button>
      <Button>PINK</Button>
      <Button>GREEN</Button>
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
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
  padding: 0.2rem;
`;
