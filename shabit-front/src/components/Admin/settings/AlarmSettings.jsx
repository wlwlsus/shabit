import React, { useEffect, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styled from 'styled-components';
import { fetchAlarmTime } from '../../../services/admin/get';
import { putAlarmTime } from '../../../services/admin/put';
import { typedUseSelector } from '../../../store';
import { loadEffect } from '../../../styles/animation';
import { useDispatch } from 'react-redux';
import { setAlertTime, setStretchingTime } from '../../../store/adminSlice';

export default function AlarmSettings() {
  const [stretchingTimeInput, setStretchingTimeInput] = useState(0);
  const [alertTimeInput, setAlertTimeInput] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchAlarmTime().then((res) => {
      console.log(res);
      dispatch(setStretchingTime(res.stretchingTime));
      dispatch(setAlertTime(res.alertTime));

      setStretchingTimeInput(res.stretchingTime);
      setAlertTimeInput(res.alertTime);
    });
  }, []);

  const stretchingTime = typedUseSelector(
    (state) => state.admin.stretchingTime / 60 / 1000,
  );
  const alertTime = typedUseSelector(
    (state) => state.admin.alertTime / 60 / 1000,
  );

  const onClick = async (e) => {
    if (stretchingTime === stretchingTimeInput && alertTime === alertTimeInput) return;

    const newStretchingTime = stretchingTimeInput
      ? stretchingTimeInput
      : stretchingTime / 60 / 1000;
    const newAlertTime = alertTimeInput
      ? alertTimeInput
      : alertTime / 60 / 1000;
    
    dispatch(setStretchingTime(newStretchingTime));
    dispatch(setAlertTime(newAlertTime));

    console.log(newAlertTime);

    putAlarmTime(newStretchingTime, newAlertTime).catch();
  };

  return (
    <ContentWrapper>
      <Content>
        <div>스트레칭 알림 : </div>
        <div>
          <I>
            <TiArrowSortedUp
              onClick={() => {
                setStretchingTimeInput(stretchingTimeInput + 1);
              }}
            />
          </I>
          <P>{stretchingTimeInput} 분</P> 마다,
          <I>
            <TiArrowSortedDown
              onClick={() => setStretchingTimeInput(stretchingTimeInput - 1)}
            />
          </I>
        </div>
      </Content>
      <Content>
        <div>자세 경고 알림 :</div>
        <div>
          <I>
            <TiArrowSortedUp
              onClick={() => {
                setAlertTimeInput(alertTimeInput + 1);
              }}
            />
          </I>
          <P>{alertTimeInput} 분</P> 마다
          <I>
            <TiArrowSortedDown
              onClick={() => setAlertTimeInput(alertTimeInput - 1)}
            />
          </I>
        </div>
      </Content>
      <ButtonWrapper>
        <Content>
          <div style={{ padding: '0.2rem' }}>울리기</div>
          <StyledButton
            onClick={onClick}
            className={
              stretchingTime === stretchingTimeInput &&
              alertTime === alertTimeInput &&
              'disabled'
            }
          >
            수정하기
          </StyledButton>
        </Content>
      </ButtonWrapper>
    </ContentWrapper>
  );
}

const Wrapper = styled.div``;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.2rem 0.3rem;
  margin-left: 0.4rem;
  border-radius: 0.3rem;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 23rem;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  left: 23.3rem;
  top: 4.4rem;
`;
const Content = styled.div`
  font-weight: bold;
  max-width: 13rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: 0.8s ease-in ${loadEffect.down};
  .disabled {
    background-color: ${(props) => props.theme.color.grayColor};
    cursor: default;
  }
`;

const I = styled.p`
  color: ${(props) => props.theme.color.primary};
  margin-left: 0.7rem;
  margin-top: 0.3rem;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const P = styled.span`
  color: ${(props) => props.theme.color.primary};
  font-size: 1.05rem;
  margin: 0 0.3rem;
  position: relative;
`;
