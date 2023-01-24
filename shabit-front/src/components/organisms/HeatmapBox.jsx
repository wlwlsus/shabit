import React from 'react';
import styled from 'styled-components';

import Container from '../atoms/Container';
import Heatmap from '../molecules/Heatmap';

export default function HeatmapBox() {
  return (
    <HeatmapWrapper>
      <Container
        border={'rounded'}
        shadow={'shadow'}
        edge={'secondary'}
        children={<Heatmap />}
      />
    </HeatmapWrapper>
  );
}

const HeatmapWrapper = styled.div`
  width: 100%;
  & > div {
    & > div {
      margin: 1rem auto;
      margin-bottom: 0;
    }
  }
`;
