import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/videoSlice';

import axios from 'axios';

export default function VideoList() {
  const [videoList, setVideoList] = useState(); // 비디오 리스트

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
        // console.log(err);
      });
  }, []);

  // 선택한 비디오 정보 redux로 보냄
  const dispatch = useDispatch();
  const selectVideo = (idx) => {
    dispatch(setSelected(videoList[idx]));
  };

  if (videoList) {
    return (
      <VideoContainer>
        {videoList.map((video, idx) => {
          return (
            <Container
              key={idx}
              onClick={() => {
                selectVideo(idx);
              }}
            >
              <Minute>{video.length}분</Minute>
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
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};
  position: relative;

  border: 0.2rem solid ${theme.color.secondary};

  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  & > img {
    border-radius: 0.5rem;
  }
`;

const Minute = styled.div`
  padding: 0.2rem 0;
  font-weight: bold;
  width: 40%;
  text-align: center;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.lightGrayColor};

  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};

  position: absolute;
  top: -10%;
`;
