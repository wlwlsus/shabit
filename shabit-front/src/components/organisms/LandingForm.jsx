import React from 'react';

import Container from '../atoms/Container';

const LandingForm = ({ children }) => {
  return (
    <Container shadow={'shadow'} border={'rounded'} size={'md'}>
      {children}
    </Container>
  );
};

export default LandingForm;
