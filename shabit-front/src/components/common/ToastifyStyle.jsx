import React from 'react';
import styled from 'styled-components';

const ToastifyStyle = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default ToastifyStyle;

const StyledContainer = styled.div`
  /* --toastify-color-light: #fff; */
  --toastify-color-light: ${(props) => props.theme.color.whiteColor};
  /* --toastify-color-success: #07bc0c; */
  --toastify-color-success: ${(props) => props.theme.color.primary};
  /* --toastify-color-error: #e74c3c; */
  --toastify-color-error: ${(props) => props.theme.color.primary};
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-error: var(--toastify-color-error);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-error: var(--toastify-color-error);
`;
