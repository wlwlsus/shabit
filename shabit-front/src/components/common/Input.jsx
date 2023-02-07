import React from 'react';
import styled from 'styled-components';

export default function Input({ type, placeholder, name, value, onChange }) {
  return (
    <div>
      <InputWrapper
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const InputWrapper = styled.input`
  padding: 0.7rem;
  margin: 0.2rem 0;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;
