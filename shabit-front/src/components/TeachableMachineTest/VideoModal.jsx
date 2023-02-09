import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoURL } from '../../store/videoSlice';

import { BiDownload } from 'react-icons/bi';
import {BsFillXCircleFill} from 'react-icons/bs';

export default function Modal({ setModal }) {
  const selected = useSelector((state) => {
    return state.video.selected;
  });
  const downloadVideo = ()=>{
    
  }

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
        <Title>내 모습을 확인하세요</Title>
          여기에 내 모습 비디오 띄우기
        <IconWrapper>
          <BiDownload onClick={downloadVideo()} />
          다운로드하기
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
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > svg {
    color: ${(props) => props.theme.color.primary};
    font-size: 2.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Container = styled.div`
  z-index: 999;
  background-color: ${(props) => props.theme.color.whiteColor};
  width: 55rem;
  height: 25rem;
  border-radius: 0 0 1.5rem 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.div`
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  font-size: 1.3rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 2rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;

  & > svg {
    font-size: 2.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
