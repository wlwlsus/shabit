import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setGoalModal } from '../../store/goalSlice';
import { fetchGoal } from '../../services/goal/get';
import Goal from '../../services/goal';
import { setPercentage, setTime } from '../../store/goalSlice';

import { BsFillXCircleFill } from 'react-icons/bs';

export default function Modal() {
  const user = JSON.parse(sessionStorage.getItem('user')); // user 불러오기

  useEffect(() => {
    // user 존재하는지 체크
    if (!user.email) return;
  }, [user.email]);

  const dispatch = useDispatch();
  const [goal, setGoal] = useState({
    // 저장되어있는 percentage 값과 time값 불러오기
    percentage: useSelector((state) => {
      return state.goal.percentage;
    }),
    hour: useSelector((state) => {
      return parseInt(state.goal.time / 60);
    }),
    minute: useSelector((state) => {
      return state.goal.time % 60;
    }),
  });

  const [changeModal, setChangeModal] = useState(false); // changeModal: 수정이 완료되었다는 창으로 바꿔줄 지를 나타냄

  const [inputs, setInputs] = useState({
    // input 값을 불러온 값으로 설정
    percentage: goal.percentage,
    hour: goal.hour,
    minute: goal.minute,
  });
  const { percentage, hour, minute } = inputs; // 불러온 값들이 input에 따라 바뀔 수 있도록 설정

  useEffect(() => {
    // 렌더링 될때마다 목표 값들을 가져와서 저장
    fetchGoal(user.email).then((res) => {
      setGoal(res);
    });
  }, []);

  const onChangeHandler = (e) => {
    // input 값이 바뀔 때마다 inputs에 넣음
    const { value, name } = e.target;
    if (isNaN(value)) return; // 숫자가 아니면 리턴
    if (name == 'percentage') {
      // 0 미만, 100 초과의 값이 들어오면 리턴
      if (value < 0 || value > 100) return;
    } else if (name == 'hour') {
      if (parseInt(value) * 60 + parseInt(minute) > 1440) return; // 하루(1440분)에 달성할 수 있는 시간이 아니면 리턴
    } else {
      if (value >= 60) return; // 60분 이상을 입력하면 리턴
      if (parseInt(hour) * 60 + parseInt(value) > 1440) return; // 하루(1440분)에 달성할 수 있는 시간이 아니면 리턴
    }
    if (value != '') {
      setInputs({
        ...inputs,
        [name]: parseInt(value),
      });
    } else {
      setInputs({
        ...inputs,
        [name]: 0,
      });
    }
  };

  const updateGoal = () => {
    let time = parseInt(hour) * 60 + parseInt(minute);
    // goal을 업데이트 함
    Goal.putGoal(user.email, percentage, time)
      .then(() => {
        resetChangeModal();
      })
      .catch((err) => {
        window.alert('오류가 발생하였습니다.');
      });
    // 저장되어있는 값도 바꿔줌 -> 목표 페이지에 있는 값도 바뀔 수 있도록
    dispatch(setPercentage(percentage));
    dispatch(setTime(time));
  };

  const onCheckEnter = (e) => {
    // enter로 수정
    if (e.key === 'Enter') {
      if (!changeModal) updateGoal();
    }
  };

  // 수정되었습니다 모달 창을 1초 후에 닫습니다.
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const resetChangeModal = () => {
    setChangeModal(true);

    clearTimeout(currentTimeout);
    const newTimeout = setTimeout(() => {
      setChangeModal(false);
      dispatch(setGoalModal(false));
    }, 1000);
    setCurrentTimeout(newTimeout);
  };

  return (
    <ContainerWrapper onKeyUp={onCheckEnter}>
      {!changeModal && (
        <EditWrapper>
          <ModalHeader>
            <BsFillXCircleFill
              onClick={() => {
                dispatch(setGoalModal(false));
              }}
            />
          </ModalHeader>
          <Container>
            <Title>나의 바른 자세 목표</Title>
            <InputContainer>
              <InputWrapper>
                <P>자세 비율</P>
                <Input // min max 설정 필요
                  type="text" // 한글은 들어가게됨 -> onChangeHandler에서 막음
                  name="percentage"
                  value={percentage}
                  onChange={onChangeHandler}
                  shadow={'shadow'}
                />
                <P>%</P>
              </InputWrapper>
              <InputWrapper>
                <P>유지 시간</P>
                <Input
                  type="text"
                  name="hour"
                  value={hour}
                  onChange={onChangeHandler}
                  shadow={'shadow'}
                />
                <P>시간</P>
                <Input
                  type="text"
                  name="minute"
                  value={minute}
                  onChange={onChangeHandler}
                  shadow={'shadow'}
                />
                <P>분</P>
              </InputWrapper>
            </InputContainer>
            <ButtonWrapper>
              <Button onClick={updateGoal}>수정하기</Button>
            </ButtonWrapper>
          </Container>
        </EditWrapper>
      )}
      {changeModal && (
        <EditWrapper>
          <ContentWrapper>
            <Content>목표 설정이 완료되었습니다.</Content>
            {/* <ButtonWrapper>
              <OkButton
                onClick={() => {
                  dispatch(setGoalModal(false));
                }}
              >
                확인
              </OkButton>
            </ButtonWrapper> */}
          </ContentWrapper>
        </EditWrapper>
      )}
    </ContainerWrapper>
  );
}

const EditWrapper = styled.div``;

const ContainerWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 998;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  z-index: 999;
  width: 30rem;
  height: 4rem;
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > svg {
    color: ${(props) => props.theme.color.primary};
    font-size: 1.5rem;
    margin-right: 0.5rem;
    transition: all 0.2s linear;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;

const Container = styled.div`
  z-index: 999;
  color: ${(props) => props.theme.color.primary};

  background-color: ${(props) => props.theme.color.whiteColor};
  width: 30rem;
  height: 20rem;
  padding: 0 0 1rem 0;
  border-radius: 0 0 1.5rem 1.5rem;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
`;

const ContentWrapper = styled.div`
  z-index: 999;
  color: ${(props) => props.theme.color.primary};

  background-color: ${(props) => props.theme.color.whiteColor};
  width: 30rem;
  height: 15rem;
  padding: 1rem;
  border-radius: 1.5rem;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Content = styled.div`
  // margin-top: 3rem;
  font-size: 1.2rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.7rem;
  margin: 0.2rem 0;
  width: 6rem;
  border-radius: 0.5rem;
  font-size: 2rem;
  text-align: center;
  background-color: ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  // number input 옆 arrow 지우기
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const P = styled.p`
  font-size: 1.2rem;
  margin: 0 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: start;
  align-items: center;
  margin: 1rem auto;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  &:hover {
    cursor: pointer;
  }
`;

const OkButton = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  &:hover {
    cursor: pointer;
  }
`;
