import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';
import { redirect } from 'react-router-dom';

export default function SocialLogin() {
  return (
    <>
      <div>다른 계정으로 로그인하기</div>
      <IconWrapper>
        <FcGoogle onClick={() => getSocialLoginUrl('google')} />
        <SiKakaotalk onClick={() => getSocialLoginUrl('kakao')} />
        <SiNaver onClick={() => getSocialLoginUrl('naver')} />
      </IconWrapper>
    </>
  );
}

function getSocialLoginUrl(socialType) {
  const redirectUri = 'http://localhost:3000/oauth/redirect';
  const url = `http://localhost:8080/oauth2/authorization/${socialType}?redirect_uri=${redirectUri}`;
  window.location.href = url;
}
const IconWrapper = styled.div`
  width: 30%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  font-size: 1.5rem;

  transition: all 0.2s linear;

  & > svg {
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      transform: scale(1.1);
    }
  }

  & > svg:nth-child(2) {
    background-color: ${theme.color.blackColor};
    color: ${theme.color.yellowColor};
    border-radius: 0.2rem;
  }

  & > svg:nth-child(3) {
    background-color: ${theme.color.whiteColor};
    color: ${theme.color.greenColor};
    border-radius: 0.2rem;
  }
`;
