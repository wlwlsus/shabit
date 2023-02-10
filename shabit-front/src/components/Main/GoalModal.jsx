import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setGoalModal } from '../../store/goalSlice';
import { fetchGoal } from '../../services/goal/get';
import Goal from '../../services/goal';
import { setPercentage, setTime } from '../../store/goalSlice';

import { BsFillXCircleFill } from 'react-icons/bs';

export default function Modal() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  // const user = typedUseSelector((state) => {
  //   return state.auth.user;
  // });
  useEffect(() => {
    if (!user.email) return;
  }, [user.email]);

  const dispatch = useDispatch();
  const [goal, setGoal] = useState({
    percentage: useSelector((state) => {
      return state.goal.percentage;
    }),
    time: useSelector((state) => {
      return state.goal.time;
    }),
  });

  const [changeModal, setChangeModal] = useState(false);

  const [inputs, setInputs] = useState({
    percentage: goal.percentage,
    time: goal.time,
  });
  const { percentage, time } = inputs;

  useEffect(() => {
    const mounted = async () => {
      fetchGoal(user.email).then((res) => {
        setGoal(res);
      });
    };
    mounted();
  }, []);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const updateGoal = () => {
    Goal.putGoal(user.email, percentage, time)
      .then(() => {
        setChangeModal(true);
      })
      .catch((err) => {});
    dispatch(setPercentage(percentage));
    dispatch(setTime(time));
  };

  return (
    <ContainerWrapper>
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
            <InputWrapper>
              <P>자세 비율</P>
              <Input
                type="number"
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
                type="number"
                name="time"
                value={time}
                onChange={onChangeHandler}
                shadow={'shadow'}
              />
              <P>분</P>
            </InputWrapper>
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
            <ButtonWrapper>
              <OkButton
                onClick={() => {
                  dispatch(setGoalModal(false));
                }}
              >
                확인
              </OkButton>
            </ButtonWrapper>
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
  width: 20rem;
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
  width: 20rem;
  height: 20rem;
  padding: 0 0 1rem 0;
  border-radius: 0 0 1.5rem 1.5rem;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 3rem;
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
