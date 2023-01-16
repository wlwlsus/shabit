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

  $.shadow {
    box-shadow: 0.2rem 0.2rem 0.2rem ${({ theme }) => theme.color.shadowColor};
  }
`;

export default Input;
