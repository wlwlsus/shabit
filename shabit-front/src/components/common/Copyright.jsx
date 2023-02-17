import React from 'react';
import styled from 'styled-components';

export default function Copyright() {
  return <CopyRight>Copyright 2023. EZPZ all rights reserved.</CopyRight>;
}

const CopyRight = styled.span`
  font-size: 0.5rem;
  color: ${(props) => props.theme.color.whiteColor};
`;
