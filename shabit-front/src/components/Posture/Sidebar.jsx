import React, { useState } from 'react';
import styled from 'styled-components';
import {
  CgTimer,
  CgSandClock,
  CgPlayPause,
  CgPlayButton,
} from 'react-icons/cg';
import { ImExit } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { setIsRunning } from '../../store/timeSlice';

import { typedUseSelector } from '../../store';

const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const usedTime = typedUseSelector((state) => {
    return `${state.time.usedTime.hour}:${state.time.usedTime.min}`;
  });
  const stretchingTime = typedUseSelector((state) => {
    return `${state.time.stretchTime.min}:${state.time.stretchTime.sec}`;
  });
  const ClickPlayButton = () => {
    dispatch(setIsRunning());
    setToggle(!toggle);
  };
  return (
    <ContainerWrapper>
      <TimeContainer>
        <IconWrapper>
          <CgTimer />
          <Text>총 이용 시간</Text>
          <Text>{usedTime}</Text>
        </IconWrapper>
        <IconWrapper>
          <CgSandClock />
          <Text>스트레칭 시간</Text>
          <Text>{stretchingTime}</Text>
        </IconWrapper>
      </TimeContainer>
      <CapturingContainer>
        {toggle ? (
          <IconWrapper>
            <CgPlayPause onClick={ClickPlayButton} />
            <Text>일시정지</Text>
          </IconWrapper>
        ) : (
          <IconWrapper>
            <CgPlayButton onClick={ClickPlayButton} />
            <Text>시작</Text>
          </IconWrapper>
        )}
        <IconWrapper>
          <ImExit />
          <Text>종료하기</Text>
        </IconWrapper>
      </CapturingContainer>
    </ContainerWrapper>
  );
};
export default Sidebar;

const ContainerWrapper = styled.div`
  width: 8rem;
  height: 36rem;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: 0 1.5rem 1.5rem 0;
  box-shadow: 0 0.1rem 0.2rem ${(props) => props.theme.color.grayColor};
  color: ${(props) => props.theme.color.whiteColor};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 0;
`;
const TimeContainer = styled.div``;
const CapturingContainer = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  margin: 1.5rem 0;
`;
const Text = styled.div`
  font-size: 0.9rem;
  margin: 0.1rem 0;
`;
// TODO: 고쳐야됨
