import React, { useEffect, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styled from 'styled-components';
import { fetchAlarmTime } from '../../../services/admin/get';
import { putAlarmTime } from '../../../services/admin/put';
import { typedUseSelector } from '../../../store';
import { loadEffect } from '../../common/animation';

export default function AlarmSettings() {
  useEffect(() => {
    fetchAlarmTime();
  }, []);
  const stretchingTime = typedUseSelector(
    (state) => state.admin.stretchingTime / 60 / 1000,
  );
  const alertTime = typedUseSelector(
    (state) => state.admin.alertTime / 60 / 1000,
  );
  const [stretchingTimeInput, setStretchingTimeInput] =
    useState(stretchingTime);
  const [alertTimeInput, setAlertTimeInput] = useState(alertTime);

  const onClick = async (e) => {
    const newStretchingTime = stretchingTimeInput
      ? stretchingTimeInput
      : stretchingTime / 60 / 1000;
    const newAlertTime = alertTimeInput
      ? alertTimeInput
      : alertTime / 60 / 1000;
    putAlarmTime(newStretchingTime, newAlertTime).catch();
  };

  return (
    <>
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
          {stretchingTimeInput === stretchingTime &&
          alertTimeInput === alertTime ? (
            <Content style={{ textAlign: 'left' }}>
              <div style={{ padding: '0.2rem' }}>울리기</div>
            </Content>
          ) : (
            <Content>
              <div style={{ padding: '0.2rem' }}>울리도록</div>
              <StyledButton onClick={onClick}>수정하기</StyledButton>
            </Content>
          )}
        </ButtonWrapper>
      </ContentWrapper>
    </>
  );
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.1rem 0.3rem;
  margin-left: 0.4rem;
  border-radius: 0.3rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 26rem;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  left: 26.3rem;
  top: 4.4rem;
`;
const Content = styled.div`
  font-weight: bold;
  max-width: 13rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: 0.8s ease-in ${loadEffect.down};
  p {
    visibility: hidden;
  }
  &:hover p {
    visibility: visible;
  }
`;

const I = styled.p`
  color: ${(props) => props.theme.color.primary};
  margin-left: 0.7rem;
  margin-top: 0.3rem;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
`;

const P = styled.span`
  color: ${(props) => props.theme.color.primary};
  font-size: 1.05rem;
  margin: 0 0.3rem;
  position: relative;
`;
