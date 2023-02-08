import React, { useEffect } from 'react';
import styled from 'styled-components';
import { retrieveVods } from '../../../services/admin/get';
import { typedUseSelector } from '../../../store';
import { theme } from '../../../styles/GlobalStyles';
import { loadEffect } from '../../common/animation';
import VideoInput from './VideoInput';
import VideoList from './VideoList';

export default function VideoSettings() {
  useEffect(() => {
    retrieveVods();
  }, []);

  const vodsList = typedUseSelector((state) => {
    return state.admin.videoList;
  });

  return (
    <VodWrapper>
      <>
        <Title>영상 추가</Title>
        <PostWrapper>
          <VideoInput />
        </PostWrapper>
      </>
      <>
        <ButtonContainer>
          <Title>영상 리스트</Title>
          <StyledButton
            onClick={() => {
              retrieveVods();
            }}
          >
            전체 불러오기
          </StyledButton>
        </ButtonContainer>
        <VideoList vodsList={vodsList} />
      </>
    </VodWrapper>
  );
}

const Title = styled.div`
  display: flex;
  align-items: center;
  align-self: start;
  margin-bottom: 0.5rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;

const PostWrapper = styled.div`
  position: relative;
  border: black;
  height: 7rem;
`;

const VodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: 0.8s ease-in ${loadEffect.up};
  position: relative;
`;

const StyledButton = styled.button`
  margin-bottom: 0.5rem;
  background-color: ${theme.color.blueColor};
  color: ${theme.color.whiteColor};
  padding: 0.3rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: x-small;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
