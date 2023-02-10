import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import notify from '../../utils/notify';
import {ImExit} from "react-icons/im";
import {CgTimer,CgSandClock,CgPlayPause,CgPlayButton} from 'react-icons/cg';
import {setIsRunning,setIsStop} from '../../store/timeSlice';
import { setVideoModal } from '../../store/trackingSlice';
import { setStretchModal } from '../../store/videoSlice';

const Sidebar = ()=>{
  const [toggle,setToggle] = useState(true);
  const dispatch = useDispatch();
 
  const isRunning = useSelector((state) => {
    return state.time.isRunning;
  });
  const stretchingMin = useSelector((state) => {
    return state.time.stretchTime.min;
  });
  const stretchingSec  = useSelector((state) => {
    return state.time.stretchTime.sec;
  });
  const pose =useSelector((state) => {
    return state.pose.pose;
  });

  useEffect(()=>{
    if(stretchingMin===0 && stretchingSec===0) {
      notify(pose,'stretching');
      // stretching modal띄우기
      dispatch(setStretchModal(false));
      //timer 지우기 -> clearInterval()
      dispatch(setIsStop(true));
    }
  },[isRunning])

  const usedTime = useSelector((state) => {
    return `${state.time.usedTime.hour}:${state.time.usedTime.min}`;
  });

  const stretchingTime = `${stretchingMin}:${stretchingSec}`;
  
  const ClickStop = ()=>{
    // 시간 같은거 모두 정지
    dispatch(setIsStop(true));
    dispatch(setIsRunning(false));
    // 모달 띄워서 내 모습 play + download
    dispatch(setVideoModal(true));
    // TODO api날리기 stat post
  }
  const ClickPlayButton =()=>{
    dispatch(setIsRunning(true));
    setToggle(!toggle);
  }
  return(
      <ContainerWrapper>
          <TimeContainer>
              <Icon><CgTimer/></Icon>
              <Text>총 이용 시간</Text>
              <Text>{usedTime}</Text>
              <Icon><CgSandClock/></Icon>
              <Text>스트레칭 시간</Text>
              <Text>{stretchingTime}</Text>
          </TimeContainer>
          <CapturingContainer>
            {toggle?
            <>
                <Icon><CgPlayPause onClick={ClickPlayButton}/></Icon>
                <Text>일시정지</Text></>:
              <>
                <Icon><CgPlayButton onClick={ClickPlayButton}/></Icon>
                <Text>시작</Text>
              </> 
            }
              <Icon><ImExit onClick={ClickStop}/></Icon>
              <Text>종료하기</Text>  
          </CapturingContainer>
      </ContainerWrapper>
    )
}
export default Sidebar;

const ContainerWrapper=styled.div`
  width: 8rem;
  height: 33rem;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: 0 1.5rem 1.5rem 0;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.grayColor};
  color: ${(props) => props.theme.color.whiteColor}
`;
const TimeContainer=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  height:50%;    
`;
const CapturingContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  height:50%;
`;

const Icon = styled.div`
  display:flex;
  align-items:center;
  font-size:2rem;
  flex-direction:column;
  margin-top:1rem;
  cursor:pointer;
`;
const Text = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  font-size:0.5rem;
`;
// TODO: 고쳐야됨