import React, { useState } from 'react';
import styled from 'styled-components';
import { loadEffect } from '../../styles/animation';

import ThemeBox from './ThemeBox';
import { BiUserCircle } from 'react-icons/bi';
import { changeNickname } from '../../services/auth/put';
import { fetchProfile } from '../../services/auth/get';
import { FireAlert, FireConfirm } from '../../services';
import { themeColor } from '../../styles/GlobalStyles';

export default function UserInfo({ user, lastDate, isModalOpen, setTheme }) {
  const { email, nickname, profile } = user;
  const [changingNickname, setChangingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState();
  const onSubmit = () => {
    if (nicknameInput.length < 2 || nicknameInput.length > 16) {
      return FireAlert('닉네임은 2~16글자 입니다.');
    }
    if (
      !nicknameInput.match(/^(?=.*[a-z0-9ㄱ-ㅎ가-힣])[a-z0-9ㄱ-ㅎ가-힣]{2,16}$/)
    ) {
      return FireAlert('닉네임에 특수문자를 사용할 수 없습니다.');
    }
    changeNickname(email, nicknameInput).then(() => {
      FireConfirm('닉네임이 변경되었습니다.');
      fetchProfile(email).then(() => {
        setChangingNickname(false);
      });
    });
  };

  return (
    <Wrapper>
      <ImgWrapper
        style={profile?.length ? { backgroundImage: `url(${profile})` } : {}}
      >
        {profile ? <></> : <BiUserCircle />}
        <span onClick={() => isModalOpen(true)}>이미지 변경하기</span>
      </ImgWrapper>

      <ContentWrapper>
        {changingNickname ? (
          <UserName style={{ cursor: 'default' }}>
            <InputWrapper>
              <StyledInput
                autoFocus
                id="nickname-input"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSubmit();
                }}
              />
            </InputWrapper>
            <StyledButton style={{ visibility: 'visible' }} onClick={onSubmit}>
              변경
            </StyledButton>
            <Dark
              style={{
                visibility: 'visible',
                marginLeft: '2.7rem',
              }}
              onClick={() => {
                setChangingNickname(false);
              }}
            >
              취소
            </Dark>
            <span>이메일 : {email}</span>
          </UserName>
        ) : (
          <UserName
            onClick={() => {
              setNicknameInput(nickname);
              setChangingNickname(true);
            }}
          >
            <span>{nickname}</span>
            <StyledButton>닉네임 변경</StyledButton>
            <span>이메일 : {email}</span>
          </UserName>
        )}
        <LastLogin>
          마지막 접속일 : {lastDate || '아직 데이터가 없습니다.'}
        </LastLogin>
        <ThemeBox setTheme={setTheme} />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};
`;

const StyledInput = styled.input`
  text-align: right;
`;

const StyledButton = styled.button`
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.grayColor};
  color: ${(props) => props.theme.color.primary};
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Dark = styled(StyledButton)`
  border: 0.1rem solid ${themeColor.darkPrim};
  color: ${themeColor.darkPrim};
  background-color: ${themeColor.darkSec};
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
  cursor: pointer;
  & > span:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
  & > button {
    position: absolute;
    top: 7.7rem;
    left: 13.1rem;
    visibility: hidden;
  }
  &:hover > button {
    visibility: visible;
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
