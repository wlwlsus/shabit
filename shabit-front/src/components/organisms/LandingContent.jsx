import React from 'react';

import Container from '../atoms/Container';
import WelcomeSign from '../molecules/WelcomeSign';
import Social from '../molecules/Social';

const LandingContent = () => {
  return (
    <Container bg={'primary'} size={'square'} shadow={'shadow'}>
      <>
        <WelcomeSign />
        <Social />
      </>
    </Container>
  );
};

export default LandingContent;
