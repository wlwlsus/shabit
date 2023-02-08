import React, { useEffect, useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styled from 'styled-components';
import { header } from '../../../services';
import { fetchAlarmTime } from '../../../services/admin/get';
import { putAlarmTime } from '../../../services/admin/put';
import store, { typedUseSelector } from '../../../store';
import { setAlertTime, setStretchingTime } from '../../../store/adminSlice';
import { theme } from '../../../styles/GlobalStyles';
import apiRequest from '../../../utils/apiRequest';
import { loadEffect } from '../../common/animation';

export default function AlarmSettings() {
  /*
    알람 시간 수정
    알람 시간 조회
  */
  useEffect(() => {
    fetchAlarmTime();
  }, []);

  // const alertTime = typedUseSelector((state) => state.admin.alertTime);
  // const stretchingTime = typedUseSelector(
  //   (state) => state.admin.stretchingTime,
  // );
  const stretchingTime = typedUseSelector(
    (state) => state.admin.stretchingTime / 60 / 1000,
  );
  const alertTime = typedUseSelector(
    (state) => state.admin.alertTime / 60 / 1000,
  );
  const [stretchingTimeInput, setStretchingTimeInput] =
    useState(stretchingTime);
  const [alertTimeInput, setAlertTimeInput] = useState(alertTime);
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stretchingTimeInput') setStretchingTimeInput(value);
    else if (name === 'alertTimeInput') setAlertTimeInput(value);
  };

  const onClick = async (e) => {
    const newStretchingTime = stretchingTimeInput
      ? stretchingTimeInput
      : stretchingTime / 60 / 1000;
    const newAlertTime = alertTimeInput
      ? alertTimeInput
      : alertTime / 60 / 1000;
    putAlarmTime(newStretchingTime, newAlertTime)
      // .then(() => {
      //   // setStretchingTimeInput(newStretchingTime);
      //   // setAlertTimeInput(newAlertTime);
      // })
      .catch();
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
              {/* <StyledButton onClick={onClick}>취소하기</StyledButton> */}
            </Content>
          )}
        </ButtonWrapper>
      </ContentWrapper>

      {/* <div>스트레칭 시간 : {stretchingTime / 60 / 1000} 분 간격</div>
      <input
        type="number"
        step="1"
        name="stretchingTimeInput"
        value={stretchingTimeInput}
        placeholder="스트레칭 시간 변경"
        onChange={onChange}
      />{' '}
      분 간격
      <div>자세 경고 시간 : {alertTime / 60 / 1000} 분 간격</div>
      <input
        type="number"
        step="1"
        name="alertTimeInput"
        value={alertTimeInput}
        placeholder="자세 경고 시간 변경"
        onChange={onChange}
      />{' '}
      분 간격 */}

      {/* <button
        type="button"
        onClick={onClick}
        // style={
        //   stretchingTimeInput === stretchingTime && alertTimeInput === alertTime
        //     ? { visibility: 'hidden' }
        //     : {}
        // }
      >
        수정하기
      </button> */}
    </>
  );
}

const StyledButton = styled.button`
  /* margin-top: 0.5rem; */
  background-color: ${theme.color.primary};
  color: ${theme.color.whiteColor};
  padding: 0.1rem 0.3rem;
  margin-left: 0.4rem;
  border-radius: 0.3rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
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
  /* margin-left: 1rem; */
  animation: 0.8s ease-in ${loadEffect.down};
  p {
    visibility: hidden;
  }
  &:hover p {
    visibility: visible;
  }
`;

const I = styled.p`
  color: ${theme.color.primary};
  /* padding: 0.1rem; */
  margin-left: 0.7rem;
  margin-top: 0.3rem;
  font-size: 1.5rem;
  cursor: pointer;
  // 클릭할 때 텍스트 선택 안되게 하기
  user-select: none;
`;

const P = styled.span`
  color: ${theme.color.primary};
  font-size: 1.05rem;
  margin: 0 0.3rem;
  position: relative;
`;
