import React from 'react';
import styled from 'styled-components';
import { typedUseSelector } from '../../../store';
import VideoCard from './VideoCard';
import VideoInfiniteScroll from './VideoInfiniteScroll';

const VideoList = ({ scrollProp, setScrollProp }) => {
  const vodsList = typedUseSelector((state) => {
    return state.admin.videoList;
  });
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
            scrollProp={scrollProp}
            setScrollProp={setScrollProp}
          />
        );
      })}
      <VideoInfiniteScroll
        scrollProp={scrollProp}
        setScrollProp={setScrollProp}
      />
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
  justify-content: start;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
