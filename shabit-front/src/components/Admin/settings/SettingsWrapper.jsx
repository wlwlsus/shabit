import React, { useState } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../../common/animation';
import AlarmSettings from './AlarmSettings';
import QuoteInput from './QuoteInput';
import QuotesList from './QuotesList';

const SettingsWrapper = () => {
  const [triggered, setTriggered] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  return (
    <StyledSettingsWrapper>
      <Title>시간 설정</Title>
      <AlarmSettings />
      <div style={{ padding: '0.5rem' }}></div>
      <ButtonContainer>
        <Title>문구 리스트</Title>
      </ButtonContainer>
      <QuoteInput
        setTriggered={setTriggered}
        setPage={setPage}
        setIsLastPage={setIsLastPage}
      />
      <QuotesList
        triggered={triggered}
        setTriggered={setTriggered}
        setIsLastPage={setIsLastPage}
        isLastPage={isLastPage}
        page={page}
        setPage={setPage}
      />
    </StyledSettingsWrapper>
  );
};

export default SettingsWrapper;

const StyledSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: 0.8s ease-in ${loadEffect.up};
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  align-self: start;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;
