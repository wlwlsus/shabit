import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = ({ role, placeholder, shadow, onClick }) => {
  return (
    <InputWrapper
      type={role}
      placeholder={placeholder}
      className={`${shadow}`}
      onClick={onClick}
    ></InputWrapper>
  );
};

Input.propTypes = {
  role: PropTypes.oneOf(['text', 'checkbox']),
  placeholder: PropTypes.string,
  shadow: PropTypes.oneOf(['shadow']),
  onClick: PropTypes.func,
};

Input.defaultProps = {
  role: 'text',
  placeholder: '',
  shadow: undefined,
  onClick: undefined,
};

const InputWrapper = styled.input`
  display: inline-block;
  padding: 0.7rem 0.5rem;
  margin-bottom: 01rem;

  &.shadow {
    box-shadow: 0 0.1rem 0.5rem #e9e9e9;
  }
`;

export default Input;
