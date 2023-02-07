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

  const alertTime = typedUseSelector((state) => state.admin.alertTime);
  const stretchingTime = typedUseSelector(
    (state) => state.admin.stretchingTime,
  );
  const [stretchingTimeInput, setStretchingTimeInput] = useState(
    typedUseSelector((state) => state.admin.stretchingTime / 60 / 1000),
  );
  const [alertTimeInput, setAlertTimeInput] = useState(
    typedUseSelector((state) => state.admin.alertTime / 60 / 1000),
  );
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stretchingTimeInput') setStretchingTimeInput(value);
    else if (name === 'alertTimeInput') setAlertTimeInput(value);
  };

  const onClick = async (e) => {
    putAlarmTime(
      stretchingTimeInput ? stretchingTimeInput : stretchingTime / 60 / 1000,
      alertTimeInput ? alertTimeInput : alertTime / 60 / 1000,
    )
      .then(() => {
        setStretchingTimeInput('');
        setAlertTimeInput('');
      })
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
            <P>{stretchingTimeInput} 분</P> 마다
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
      <button type="button" onClick={onClick}>
        수정하기
      </button>
    </>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  max-width: 30rem;
  justify-content: space-between;
`;
const Content = styled.div`
  font-weight: bold;
  max-width: 15rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  animation: 0.8s ease-in ${loadEffect.down};
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
