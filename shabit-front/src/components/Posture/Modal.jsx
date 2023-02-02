import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoURL } from '../../store/videoSlice';
import { theme } from '../../styles/GlobalStyles';

import { BsFillXCircleFill, BsPlayCircleFill } from 'react-icons/bs';

import VideoList from './VideoList';

export default function Modal({ setModal }) {
  const selected = useSelector((state) => {
    return state.video.selected;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 비디오 URL 할당 => 모달창 닫음 & 동영상 재생
  const playVideo = () => {
    dispatch(setVideoURL(`https://www.youtube.com/embed/${selected.videoId}`));
    setModal(false);
    navigate('/posture/stretch');
  };

  return (
    <ContainerWrapper>
      <ContainerHeader>
        <BsFillXCircleFill
          onClick={() => {
            setModal(false);
          }}
        />
      </ContainerHeader>
      <Container>
        <Title>원하시는 스트레칭 영상 길이를 선택해주세요.</Title>
        <VideoList />
        <IconWrapper>
          <BsPlayCircleFill onClick={playVideo} />
          시작하기
        </IconWrapper>
      </Container>
    </ContainerWrapper>
  );
}

const ContainerWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 998;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ContainerHeader = styled.div`
  z-index: 999;
  width: 55rem;
  height: 4rem;
  background-color: ${theme.color.secondary};
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > svg {
    color: ${theme.color.primary};
    font-size: 2.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Container = styled.div`
  z-index: 999;
  background-color: ${theme.color.whiteColor};
  width: 55rem;
  height: 25rem;
  border-radius: 0 0 1.5rem 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.div`
  color: ${theme.color.primary};
  font-weight: bold;
  font-size: 1.3rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 2rem;
  color: ${theme.color.primary};
  font-weight: bold;

  & > svg {
    font-size: 2.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
