import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadEffect } from '../../styles/animation';
import { typedUseSelector } from '../../store';
import { FiAlertCircle } from 'react-icons/fi';
import { BsFillCaretRightSquareFill } from 'react-icons/bs';
import {setIsRunning, setIsStop} from '../../store/timeSlice';
import { useDispatch } from 'react-redux';
import { fetchAlarmTime } from '../../services/admin/get';

export default function QuoteInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quote = typedUseSelector((state) => {
    return state.chart.quote;
  });

  return (
    <Wrapper>
      <InfoBox>
        <InfoTitle>
          <FiAlertCircle />
          알고 계셨나요?
        </InfoTitle>
        <div>{quote}</div>
      </InfoBox>

      <Start>
        <BsFillCaretRightSquareFill
          onClick={() => {
            dispatch(setIsRunning(true));
            dispatch(setIsStop(false));
            fetchAlarmTime();
            navigate('/posture/live');
          }}
        />
        <div>자세교정 시작하기</div>
      </Start>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  padding: 1.5rem 1rem;

  display: flex;
  justify-content: space-evenly;

  animation: 0.8s ease-in ${loadEffect.down};
`;

const InfoBox = styled.div`
  width: 60%;
  color: ${(props) => props.theme.color.primary};
  font-size: 1.1rem;
  font-weight: 600;

  & > div:last-child {
    width: 20rem;
    height: 5.5rem;
    overflow: hidden;
    word-wrap: break-word;
  }
`;

const InfoTitle = styled.div`
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};

  display: flex;
  align-items: center;
`;

const Start = styled.div`
  color: ${(props) => props.theme.color.primary};
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
  font-size: 0.7rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  &:active {
    transform: translateY(0.3rem);
  }

  & > svg {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
`;
