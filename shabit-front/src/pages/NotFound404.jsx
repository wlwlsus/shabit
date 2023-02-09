import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
export default function NotFound404() {
  const navigate = useNavigate();
  return (
    <NotFound>
      <p>🚨 길을 잃으셨나요?</p>
      <p>걱정마세요, SHabit이 찾아드릴게요.</p>
      <p>
        <span onClick={() => navigate(-1)}>&#11013; 이전으로</span>
        <span onClick={() => navigate('/')}>&#127968; 홈으로</span>
      </p>
    </NotFound>
  );
}

const NotFound = styled.div`
  height: 80%;
  color: ${(props) => props.theme.color.primary};
  font-size: 2.5rem;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p {
    margin: 2rem 0;

    & > span {
      margin: 0 2rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
