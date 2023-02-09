import React from 'react';
import styled from 'styled-components';
// import { loadEffect } from '../common/animation';

export default function PhotoList({ photoList }) {
  if (!photoList.length) {
    return <div>기록이 없습니다.</div>;
  } else {
    return (
      <Wrapper>
        {photoList.map((photo, idx) => {
          return (
            <Container key={idx}>
              <Img src={photo.url} />
            </Container>
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

const Container = styled.div``;

const Img = styled.img`
  border-radius: 1rem;
  margin: 0.7rem 0.9rem;
  width: 10rem;
`;
