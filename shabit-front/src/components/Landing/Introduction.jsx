import React from 'react';
import styled from 'styled-components';

import Logo from '../common/Logo';
import Icon from '../common/Icon';

import { TbArrowBigRightLine } from 'react-icons/tb';

const Introduction = () => {
  return (
    <ContentWrapper>
      <TextWrapper>
        <span>자세 교정을 위한 맞춤형 솔루션</span>
        <Logo size={'lg'} />
      </TextWrapper>
      <ImgWrapper>
        <Img src={'/assets/posture-bad.png'} alt="" />
        <Icon icon={<TbArrowBigRightLine />} color={'white'} size={'lg'} />
        <Img src={'/assets/posture-good.png'} alt="" />
      </ImgWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 9rem;
  margin: 0 1rem;
`;
export default Introduction;
