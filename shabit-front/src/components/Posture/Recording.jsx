import React from 'react'
import styled from 'styled-components'
import MyCapture from "../Live/MyCapture";
import MyPose from "../Live/MyPose";


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
  