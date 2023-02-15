import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../utils/useDebounce';
import { changePassword } from '../../services/auth/put';
import { FireAlert, FireConfirm } from '../../services';

import { BsFillXCircleFill } from 'react-icons/bs';
import { setPasswordModal } from '../../store/authSlice';

export default function Modal() {
  const user = JSON.parse(sessionStorage.getItem('user')); // user 불러오기

  useEffect(() => {
    // user 존재하는지 체크
    if (!user.email) return;
  }, [user.email]);

  const dispatch = useDispatch();

  const [message, setCurrentMessage] = useState('');
  //전체: 메시지을 2초 후 초기화합니다.
  const setMessage = (str) => {
    setCurrentMessage(str);
  };

  //onChange 핸들링입니다.
  const [inputs, setInputs] = useState({
    email: user.email,
    password: '',
    newpassword: '',
    newpassword2: '',
  });
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { email, password, newpassword, newpassword2 } = inputs;

  const debouncedPasswordConfirm = useDebounce(newpassword2, 20);
  useEffect(() => {
    if (
      debouncedPasswordConfirm &&
      debouncedPasswordConfirm.length > newpassword.length - 4
    ) {
      if (newpassword !== debouncedPasswordConfirm) {
        setMessage('비밀번호가 일치하지 않습니다');
      } else {
        setMessage('');
      }
    }
  }, [debouncedPasswordConfirm]);

  //비밀번호 검증 로직입니다.
  const [passwordMatch, setPasswordMatch] = useState(false);
  useEffect(() => {
    if (newpassword.length >= 8) {
      if (
        !newpassword.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
        )
      ) {
        setMessage('비밀번호는 영대소문자/숫자/\n특수문자를 사용해주세요.');
        setPasswordMatch(false);
      } else {
        setMessage('');
        setPasswordMatch(true);
      }
    }
  }, [newpassword, newpassword2, password]);

  // 전체 검증 로직입니다. 하위 호환을 위해 아래와 같이 추가 작성하였습니다.
  useEffect(() => {
    if (message) return;
    if (
      debouncedPasswordConfirm.length > 4 &&
      newpassword !== debouncedPasswordConfirm
    ) {
      setMessage('비밀번호가 일치하지 않습니다');
    }
    if (
      (newpassword.length < 8 && newpassword.length > 0) ||
      newpassword.length > 16
    ) {
      setMessage('비밀번호는 8자 이상 16자 이하입니다.');
    }
    if (newpassword.length >= 8) {
      if (
        !newpassword.match(
          // /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&]{8,16}/,
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
        )
      ) {
        setMessage('비밀번호는 영대소문자/숫자/\n특수문자를 사용해주세요.');
      }
    }
  }, [message]);

  const change = () => {
    if (!password) return setMessage('비밀번호를 입력해주세요');
    if (!newpassword || !newpassword2)
      return setMessage('변경할 비밀번호를 입력해주세요');
    if (passwordMatch && newpassword === newpassword2) {
      changePassword(email, password, newpassword)
        .then(() => {
          FireConfirm('비밀번호가 변경되었습니다.');
          dispatch(setPasswordModal(false));
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.message || '비밀번호 변경에 실패하였습니다.');
        });
    }
  };

  const onCheckEnter = (e) => {
    // enter로 수정
    if (e.key === 'Enter') {
      change();
    }
  };

  return (
    <ContainerWrapper onKeyUp={onCheckEnter}>
      <EditWrapper>
        <ModalHeader>
          <BsFillXCircleFill
            onClick={() => {
              dispatch(setPasswordModal(false));
            }}
          />
        </ModalHeader>
        <Container>
          <Title>비밀번호 수정</Title>
          <Msg>{message}</Msg>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={onChangeHandler}
            placeholder={'아이디'}
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={onChangeHandler}
            placeholder={'비밀번호'}
          />
          <InputContainer>
            <Input
              type="password"
              name="newpassword"
              value={newpassword}
              onChange={onChangeHandler}
              placeholder={'신규 비밀번호'}
            />
            <Input
              type="password"
              name="newpassword2"
              value={newpassword2}
              onChange={onChangeHandler}
              placeholder={'신규 비밀번호 확인'}
            />
          </InputContainer>
          <ButtonWrapper>
            <Button onClick={change}>수정하기</Button>
          </ButtonWrapper>
        </Container>
      </EditWrapper>
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
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

const Input = styled.input`
  padding: 0.7rem;
  margin: 0.2rem 0;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
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
  padding: 0.5rem 0.75rem;
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

const Msg = styled.div`
  white-space: pre-wrap;
  color: ${(props) => props.theme.color.redColor};
  position: absolute;
  padding-top: 0.5rem;
  width: 15rem;
  font-size: small;
  text-align: center;
  word-break: keep-all;
  top: 12rem;
`;
