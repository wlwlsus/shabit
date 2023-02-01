import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

export default function HeatmapScale() {
  return (
    <Wrapper>
      <span>Less</span>
      <Block style={{ backgroundColor: theme.heatMap.scale0 }} />
      <Block style={{ backgroundColor: theme.heatMap.scale1 }} />
      <Block style={{ backgroundColor: theme.heatMap.scale2 }} />
      <Block style={{ backgroundColor: theme.heatMap.scale3 }} />
      <Block style={{ backgroundColor: theme.heatMap.scale4 }} />
      <span>More</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & > span {
    margin: 0 0.3rem;
  }
`;

const Block = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0 0.1rem;
`;
