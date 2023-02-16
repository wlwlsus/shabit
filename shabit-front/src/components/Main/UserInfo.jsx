import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../../styles/animation';

import ThemeBox from './ThemeBox';
import { BiUserCircle } from 'react-icons/bi';
import { changeNickname } from '../../services/auth/put';
import { fetchProfile } from '../../services/auth/get';
import { FireAlert, FireConfirm } from '../../services';

import { useDispatch } from 'react-redux';
import { setPasswordModal } from '../../store/authSlice';
import { typedUseSelector } from '../../store';

export default function UserInfo({ user, lastDate, isModalOpen, setTheme }) {
  const dispatch = useDispatch();
  const [isSocial, setIsSocial] = useState(() => {
    JSON.parse(sessionStorage.getItem('isSocial'));
  });

  const { email, nickname, profile } = user;
  const [changingNickname, setChangingNickname] = useState(false);
  useEffect(() => {
    setIsSocial(JSON.parse(sessionStorage.getItem('isSocial')));
  });

  const onSubmit = () => {
    if (nicknameInput.length < 2 || nicknameInput.length > 14) {
      return FireAlert('닉네임은 2~14글자 입니다.');
    }
    if (
      !nicknameInput.match(
        /^(?=.*[a-zA-Z0-9ㄱ-ㅎ가-힣])[a-zA-Z0-9ㄱ-ㅎ가-힣]{2,14}$/,
      )
    ) {
      return FireAlert('닉네임에 특수문자를 사용할 수 없습니다.');
    }
    changeNickname(email, nicknameInput).then(() => {
      FireConfirm('닉네임이 변경되었습니다.');
      fetchProfile(email).then(() => {
        setChangingNickname(false);
        setInputs('');
      });
    });
  };

  useEffect(() => {
    if (document.getElementById('nickname') == null) return;
    if (changingNickname) {
      document.getElementById('nickname').focus();
    } else {
      document.getElementById('nickname').blur();
    }
  }, [changingNickname]);

  const [nicknameInput, setInputs] = useState('');

  const onChangeHandler = (e) => {
    // input 값이 바뀔 때마다 inputs에 넣음
    const { value, name } = e.target;

    if (value.length > 14) return;
    setInputs(value);
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        {changingNickname ? (
          <div style={{ display: 'flex' }}>
            <StyledButton style={{ visibility: 'visible' }} onClick={onSubmit}>
              변경
            </StyledButton>
            <Dark
              style={{
                visibility: 'visible',
                marginRight: '0.5rem',
              }}
              onClick={() => {
                setChangingNickname(false);
              }}
            >
              취소
            </Dark>
          </div>
        ) : (
          <StyledButton
            style={{ marginRight: '0.5rem' }}
            onClick={async () => {
              setChangingNickname(true);
            }}
          >
            닉네임 변경
          </StyledButton>
        )}
        <StyledButton
          onClick={() => {
            dispatch(setPasswordModal(true));
          }}
          style={isSocial ? { display: 'none' } : {}}
        >
          비밀번호 변경
        </StyledButton>
      </ButtonWrapper>
      <ImgWrapper
        style={profile?.length ? { backgroundImage: `url(${profile})` } : {}}
      >
        {profile ? <></> : <BiUserCircle />}
        <span onClick={() => isModalOpen(true)}>이미지 변경하기</span>
      </ImgWrapper>

      <ContentWrapper>
        <UserName>
          {changingNickname ? (
            <Input
              id="nickname"
              type="text"
              name="nickname"
              value={nicknameInput}
              placeholder={nickname}
              onChange={onChangeHandler}
            />
          ) : (
            <span>{nickname}</span>
          )}
          <span>이메일 : {email}</span>
        </UserName>
        <LastLogin>
          마지막 접속일 : {lastDate || '아직 데이터가 없습니다.'}
        </LastLogin>
        <ThemeBox setTheme={setTheme} />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 42rem;
  top: 4.5rem;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const StyledButton = styled.button`
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  line-height: 0.8rem;
  padding: 0.1rem 0.5rem;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  color: ${(props) => props.theme.color.primary};
  display: flex;
  align-items: center;
`;

const Dark = styled(StyledButton)`
  border: 0.1rem solid ${(props) => props.theme.color.darkGrayColor};
  color: ${(props) => props.theme.color.darkGrayColor};
  background-color: ${(props) => props.theme.color.grayColor};
`;

const ImgWrapper = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.secondary};
  background-size: cover;
  object-fit: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 4%;
  left: 7%;
  animation: 0.8s ease-in ${loadEffect.down};
  z-index: 1;

  & > svg {
    color: ${(props) => props.theme.color.primary};
    font-size: 8rem;
  }

  span {
    visibility: hidden;
    padding: 5px 10px;
    text-align: center;
    position: absolute;
    min-width: 9rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${(props) => props.theme.color.whiteColor};
    text-shadow: 0px 0px 3px black;
    cursor: pointer;
  }

  &:hover span {
    visibility: visible;
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  animation: 0.8s ease-in ${loadEffect.down};
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 1rem;
  margin: 0.3rem 0;
  & > span:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const LastLogin = styled.div`
  padding: 0.3rem;
  margin: 0.7rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  border-radius: 0.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
`;

const Input = styled.input`
  width: 15rem;
  display: flex;
  align-items: flex-end;
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;

  &::placeholder {
    color: ${(props) => props.theme.color.grayColor};
  }
`;
