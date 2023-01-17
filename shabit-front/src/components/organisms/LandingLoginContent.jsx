import React from 'react';
import styled from 'styled-components';

import WelcomeSign from '../molecules/WelcomeSign';
import Social from '../molecules/Social';

const LandingLoginContent = () => {
  return (
    <Wrapper>
      <WelcomeSign />
      <Social />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default LandingLoginContent;
