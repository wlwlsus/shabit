import React from 'react';
import styled from 'styled-components';

import Text from '../atoms/Text';
import Img from '../atoms/Img';

const WelcomeSign = () => {
  return (
    <Wrapper>
      <Text text={'Welcome to'} color={'white'} />
      <Img assets={true} size={'lg'} src={'/assets/logo-white.png'} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default WelcomeSign;
