import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

export default function Input({ placeholder }) {
  return <InputWrapper placeholder={placeholder} />;
}

const InputWrapper = styled.input`
  padding: 0.7rem;
  margin: 0.2rem 0;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
