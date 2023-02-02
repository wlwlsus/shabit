import React from 'react'
import styled from 'styled-components'
// import Capture from '../TeachableMachineTest/Capture'
// import MyVideo from "../TeachableMachineTest/MyVideo"
import MyCapture from "../TeachableMachineTest/MyCapture";
import MyPose from "../TeachableMachineTest/MyPose";


export const Recording = () => {
  return (
    <PoseStyle>
        <MyCapture />
        <MyPose/>
    </PoseStyle>
  )
  
}

const PoseStyle = styled.div`
`;
  