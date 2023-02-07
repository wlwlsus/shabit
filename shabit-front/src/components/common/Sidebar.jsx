import React,{useState} from 'react';
import styled from 'styled-components';
import {CgTimer,CgSandClock,CgPlayPause,CgPlayButton} from 'react-icons/cg';
import {ImExit} from "react-icons/im";
import { useDispatch } from 'react-redux';
import {setIsRunning} from '../../store/timeSlice';

import { typedUseSelector } from '../../store';

const Sidebar = ()=>{
  const [toggle,setToggle] = useState(true);
  const dispatch = useDispatch();
  const usedTime = typedUseSelector((state) => {
    return `${state.time.usedTime.hour}:${state.time.usedTime.min}`;
  });
  const stretchingTime = typedUseSelector((state) => {
    return `${state.time.stretchTime.min}:${state.time.stretchTime.sec}`;
  });
  const ClickPlayButton =()=>{
    dispatch(setIsRunning());
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
              <Icon><ImExit/></Icon>
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
`;
const Text = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  font-size:0.5rem;
`;
// TODO: 고쳐야됨