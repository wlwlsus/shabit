import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';

export default function SocialLogin() {
  const redirectUri = 'http://localhost:3000/oauth/redirect';
  // const redirectUri = 'https://shabit.site/oauth/redirect';

  const goSocialLogin = (socialType) => {
    const url = `https://shabit.site:8080/oauth2/authorization/${socialType}?redirect_uri=${redirectUri}`;
    window.location.href = url;
  };

  return (
    <>
      <Text>다른 계정으로 로그인하기</Text>
      <IconWrapper>
        <FcGoogle onClick={() => goSocialLogin('google')} />
        <SiKakaotalk onClick={() => goSocialLogin('kakao')} />
        <SiNaver onClick={() => goSocialLogin('naver')} />
      </IconWrapper>
    </>
  );
}

const Text = styled.div`
  font-size: 1rem;
`;

const IconWrapper = styled.div`
  width: 35%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
  font-size: 2.2rem;

  transition: all 0.2s linear;

  & > svg {
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      transform: scale(1.1);
    }
  }

  & > svg:nth-child(2) {
    background-color: ${(props) => props.theme.color.blackColor};
    color: ${(props) => props.theme.color.yellowColor};
    border-radius: 0.2rem;
  }

  & > svg:nth-child(3) {
    background-color: ${(props) => props.theme.color.whiteColor};
    color: ${(props) => props.theme.color.greenColor};
    border-radius: 0.2rem;
  }
`;
