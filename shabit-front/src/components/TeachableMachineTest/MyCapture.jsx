import React from 'react';
import styled from 'styled-components';
import {  useSelector } from 'react-redux';

// posture page에 배치하고 어떻게 배치해야할지 모르겟음
const MyCapture = () => {

  const curPose = useSelector((state) => {
    return state.pose.pose;
  });
  
  return (
    <ContainerWrapper>
      {curPose && (
          <InfoBox>현재자세 : {curPose}</InfoBox>
      )}
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  margin-top:3rem;
`;
const InfoBox = styled.div`
  width: 45rem;
  height: 3rem;
  background-color: ${(props) => props.theme.color.secondary};
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  border-radius: 1rem;
  font-weight: bold;
  padding: 1rem;
  display: flex;
  align-items: center;
`;


export default MyCapture;
