import React from 'react'
import styled from 'styled-components'
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'
export default function Tracking() {
  const goSite = () => {
    window.location.href = 'http://shabit.site/'
  }
  return (
    <>
      <Wrapper>
        <Logo src={`${process.env.PUBLIC_URL}/assets/logo-pink.png`} />
        <Nickname>
          username
          <Email>ssafy1234@gamil.com</Email>
        </Nickname>

        <Time>
          총 이용 시간
          <Timer>00 : 00</Timer>
        </Time>

        <BsPauseCircleFill />

        <Text onClick={goSite}>홈페이지로 이동하기</Text>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};

  &:hover {
    cursor: default;
  }

  & > svg {
    font-size: 2.2rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`

const Logo = styled.img`
  margin: 0 1rem 0 0;
  width: 3.7rem;
  align-self: flex-end;
`

const Nickname = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
  color: ${(props) => props.theme.color.blackColor};
`

const Email = styled.div`
  margin-top: 0.2rem;
  font-size: 0.8rem;
  font-weight: 100;
`

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
`

const Timer = styled.div`
  font-size: 1.3rem;
  margin-top: 0.3rem;
`

const Text = styled.div`
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
  }
`
