import React from 'react';
import PropTypes from 'prop-types';

import Container from '../atoms/Container';
import WelcomeSign from '../molecules/WelcomeSign';

const LandingContent = ({ children1, children2 }) => {
  return (
    <Container
      bg={'primary'}
      size={'square'}
      shadow={'shadow'}
      children={
        <>
          {children1}
          {children2}
        </>
      }
    ></Container>
  );
};

LandingContent.propTypes = {
  children1: PropTypes.element,
  children2: PropTypes.element,
};

LandingContent.defaultProps = {
  children1: <WelcomeSign />,
  children2: undefined,
};

export default LandingContent;
