import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

export default function HeatmapScale() {
  const themeContext = useContext(ThemeContext);
  return (
    <Wrapper>
      <span>Less</span>
      <Block style={{ backgroundColor: themeContext.heatMap.scale0 }} />
      <Block style={{ backgroundColor: themeContext.heatMap.scale1 }} />
      <Block style={{ backgroundColor: themeContext.heatMap.scale2 }} />
      <Block style={{ backgroundColor: themeContext.heatMap.scale3 }} />
      <Block style={{ backgroundColor: themeContext.heatMap.scale4 }} />
      <span>More</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
