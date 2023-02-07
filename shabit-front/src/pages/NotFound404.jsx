import React from 'react';
import styled from 'styled-components';
export default function NotFound404() {
  return (
    <NotFound>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <p>올바른 URL을 입력하였는지 확인하세요.</p>
    </NotFound>
  );
}

const NotFound = styled.div`
  height: 80%;
  color: ${(props) => props.theme.color.primary};
  font-size: 2rem;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p {
    margin: 1rem 0;
  }
`;
