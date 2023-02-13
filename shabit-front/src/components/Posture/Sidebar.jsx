import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../utils/notify';
import { ImExit } from 'react-icons/im';
import {
  CgTimer,
  CgSandClock,
  CgPlayPause,
  CgPlayButton,
} from 'react-icons/cg';
import { setIsRunning, setIsStop } from '../../store/timeSlice';
import { setInitLogArray, setVideoModal } from '../../store/trackingSlice';
import { setStretchModal } from '../../store/videoSlice';
import { postData } from '../../services/stat/post';

const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();

  const isRunning = useSelector((state) => {
    return state.time.isRunning;
  });
  const stretchingMin = useSelector((state) => {
    return state.time.stretchTime.min;
  });
  const stretchingSec = useSelector((state) => {
    return state.time.stretchTime.sec;
  });
  const pose = useSelector((state) => {
    return state.pose.pose;
  });
  const logArray = useSelector((state)=>{
    return state.tracking.logArray;
  });
  const userEmail = useSelector((state)=>{
    return state.auth.user.email;
  })

  useEffect(() => {
    if (stretchingMin === 0 && stretchingSec === 0) {
      notify(pose, 'stretching');
      // stretching modal띄우기
      dispatch(setStretchModal(false));
      postData(userEmail,logArray).then(()=>{
        setInitLogArray();
      })
      //timer 지우기 -> clearInterval()
      dispatch(setIsStop(true));
    }
  }, [isRunning]);

  const usedTime = useSelector((state) => {
    return `${state.time.usedTime.hour}:${state.time.usedTime.min}`;
  });

  const stretchingTime = `${stretchingMin}:${stretchingSec}`;

  const clickStop = () => {
    // 시간 같은거 모두 정지
    dispatch(setIsStop(true));
    dispatch(setIsRunning(false));
    // 모달 띄워서 내 모습 play + download
    dispatch(setVideoModal(true));
    // TODO api날리기 stat post
    postData(userEmail,logArray).then(()=>{
      setInitLogArray();
    })
  };
  const clickPlayButton = () => {
    dispatch(setIsRunning(true));
    setToggle(!toggle);
  };
  const clickPauseButton = () =>{
    dispatch(setIsRunning(false));
    setToggle(!toggle);
  }
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
            <CgPlayPause onClick={clickPauseButton} />
            <Text>일시정지</Text>
          </IconWrapper>
        ) : (
          <IconWrapper>
            <CgPlayButton onClick={clickPlayButton} />
            <Text>시작</Text>
          </IconWrapper>
        )}
        <IconWrapper>
          <ImExit onClick={clickStop} />
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
