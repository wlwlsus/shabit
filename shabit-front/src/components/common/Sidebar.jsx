import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import {CgTimer,CgSandClock,CgPlayPause} from 'react-icons/cg';
import {ImExit} from "react-icons/im";

const Sidebar = ()=>{
    return(
        <ContainerWrapper>
            <TimeContainer>
                <Icon><CgTimer/></Icon>
                <Text>총 이용 시간</Text>
                
                <Icon><CgSandClock/></Icon>
                <Text>스트레칭 시간</Text>
            </TimeContainer>
            <CapturingContainer>
                <Icon><CgPlayPause /></Icon>
                <Text>일시정지</Text>    
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
  background-color: ${theme.color.primary};
  border-radius: 0 1.5rem 1.5rem 0;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.grayColor};
  color: ${theme.color.whiteColor}
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
