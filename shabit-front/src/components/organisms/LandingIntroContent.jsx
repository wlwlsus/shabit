import React from 'react';
import styled from 'styled-components';

import Img from '../atoms/Img';
import Label from '../atoms/Label';
import Logo from '../molecules/Logo';

import { TbArrowBigRightLine } from 'react-icons/tb';

const LandingIntroContent = () => {
  return (
    <ContentWrapper>
      <TextWrapper>
        <Label text={'자세 교정을 위한 맞춤형 솔루션'} size={'md'} />
        <Logo size={'lg'} />
      </TextWrapper>
      <ImgWrapper>
        <Img assets={true} size={'lg'} src={'/assets/posture-bad.png'} />
        <Label size={'lg'} icon={<TbArrowBigRightLine />} />
        <Img assets={true} size={'lg'} src={'/assets/posture-good.png'} />
      </ImgWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: inline-block;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LandingIntroContent;
