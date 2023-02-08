import React from 'react';
import styled from 'styled-components';
import VideoCard from './VideoCard';

const VideoList = ({ vodsList }) => {
  return (
    <ListWrapper>
      {vodsList.map((element, idx) => {
        return (
          <VideoCard
            key={element.videoId}
            thumbnail={element.thumbnail}
            categoryId={element.category.categoryId}
            title={element.title}
            originalLength={element.originalLength}
            videoId={element.videoId}
            vodsList={vodsList}
          />
        );
      })}
    </ListWrapper>
  );
};

export default VideoList;

const ListWrapper = styled.div`
  max-height: 22rem;
  max-width: 100%;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: space-between;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
