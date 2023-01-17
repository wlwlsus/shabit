import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Img from '../atoms/Img';

const WelcomeSign = () => {
  return (
    <Wrapper>
      <Label text={'Welcome to'} />
      <Img assets={true} size={'lg'} src={'/assets/logo-white.png'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default WelcomeSign;
