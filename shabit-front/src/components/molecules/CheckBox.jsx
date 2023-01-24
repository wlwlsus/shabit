import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Input from '../atoms/Input';

export default function CheckBox({ text, color }) {
  return (
    <CheckBoxWrapper>
      <Label text={text} color={color}>
        <Input role={'checkbox'} />
      </Label>
    </CheckBoxWrapper>
  );
}

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;
