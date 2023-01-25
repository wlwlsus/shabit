import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

export default function Input({ placeholder }) {
  return <InputWrapper placeholder={placeholder} />;
}

const InputWrapper = styled.input`
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
