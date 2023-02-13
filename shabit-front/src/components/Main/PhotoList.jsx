import React from 'react';
import styled from 'styled-components';
import { loadEffect } from '../../styles/animation';

export default function PhotoList({ photoList }) {
  if (!photoList.length) {
    return <Message>기록이 없습니다.</Message>;
  } else {
    return (
      <Wrapper>
        {photoList.map((photo) => {
          return <Img src={photo.url} key={photo.url} />;
        })}
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {photoList.map((photo) => {
        return <Img src={photo.url} key={photo.url} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: e
  justify-content: flex-start;
  align-content: flex-start;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 11rem;
`;

const Img = styled.img`
  border-radius: 0.5rem;
  margin: 0.7rem 0.9rem;
  width: 10rem;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.grayColor};
  animation: 0.8s ease-in ${loadEffect.down};
`;
