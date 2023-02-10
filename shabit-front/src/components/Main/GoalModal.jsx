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
        setMessage('수정되었습니다.');
      })
      .catch((err) => {
        setMessage('에러가 발생했습니다.');
      });
    dispatch(setPercentage(percentage));
    dispatch(setTime(time));
  };

  const [message, setCurrentMessage] = useState('');
  const [currentTimeout, setCurrentTimeout] = useState(null);
  //전체: 메시지을 2초 후 초기화합니다.
  const setMessage = (str) => {
    setCurrentMessage(str);
    if (!str) return;
    clearTimeout(currentTimeout);
    const newTimeout = setTimeout(() => {
      setCurrentMessage(' ');
    }, 2000);
    setCurrentTimeout(newTimeout);
  };

  return (
    <ContainerWrapper>
      <Alert>{message}</Alert>
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
    </ContainerWrapper>
  );
}

const Alert = styled.div`
  z-index: 1000;
  display: flex;
  position: absolute;
  align-items: center;
  top: 21rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.darkGray}; ;
`;

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
    font-size: 2.5rem;
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
  height: 30rem;
  padding: 0 0 1rem 0;
  border-radius: 0 0 1.5rem 1.5rem;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 2.5rem;
  margin-bottom: 3rem;
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
  font-size: 3rem;
  text-align: center;
  background-color: ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

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
  font-size: 2rem;
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
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  &:hover {
    cursor: pointer;
  }
`;
