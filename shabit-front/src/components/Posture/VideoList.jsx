import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/videoSlice';

import axios from 'axios';

export default function VideoList() {
  const [videoList, setVideoList] = useState(); // 비디오 리스트

  const dispatch = useDispatch();

  // 렌더링 후 비디오 리스트 가져옴
  useEffect(() => {
    axios({
      method: 'get',
      url: `/testData/videoData.json`,
    })
      .then((res) => {
        setVideoList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (videoList) {
    return (
      <VideoContainer>
        {videoList.map((video, idx) => {
          return (
            <Container
              key={idx}
              onClick={() => {
                dispatch(setSelected(videoList[idx]));
              }}
            >
              <Title>{video.length}분</Title>
              <img src={video.thumbnail} alt="thumbnail" />
            </Container>
          );
        })}
      </VideoContainer>
    );
  }
}

const VideoContainer = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: space-evenly;
`;

const Container = styled.div`
  width: 30%;
  padding: 1rem;
  border: 0.2rem solid ${theme.color.secondary};
  border-radius: 1rem;
  position: relative;

  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  padding: 0.2rem 0;
  color: ${theme.color.primary};
  font-weight: bold;
  width: 40%;
  text-align: center;
  background-color: ${theme.color.secondary};
  border-radius: 0.5rem;
  position: absolute;
  top: -10%;
`;
