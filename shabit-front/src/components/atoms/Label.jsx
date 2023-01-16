import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = ({ text, color, background, shadow, icon }) => {
  const backgroundClass = `bg-${background}`;

  return (
    <LabelWrapper color={color} className={`${backgroundClass} ${shadow}`}>
      {icon && <Icon>{icon}</Icon>}
      <Text>{text}</Text>
    </LabelWrapper>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  background: PropTypes.oneOf[('primary', 'secondary')],
  icon: PropTypes.element,
};

Label.defaultProps = {
  background: undefined,
  color: undefined,
  icon: null,
};

const LabelWrapper = styled.div`
  display: inline-block;
  vertical-align: baseline;
  color: color: ${(props) => props.color || 'black'};
  background-color: ${({ theme }) => theme.color.whiteColor};

  .&bg-primary {
    background-color: ${({ theme }) => theme.color.primary};
  }

  .&bg-secondary {
    background-color: ${({ theme }) => theme.color.secondary};
  }

  .$shadow{
    box-shadow: 0.2rem 0.2rem 0.2rem ${({ theme }) => theme.color.shadowColor};
  }
`;

const Text = styled.span`
  display: inline-block;
  text-align: center;
  flex: 1;
`;

const Icon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export default Label;
