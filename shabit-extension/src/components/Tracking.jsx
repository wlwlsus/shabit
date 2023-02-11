import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'
export default function Tracking({ user }) {
  const [pause, setPause] = useState(false)
  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(0)
  const [hrs, setHrs] = useState(0)
  let time = { s: sec, m: min, h: hrs }

  // 타이머 (pause 값에 따라 동작)
  useEffect(() => {
    if (pause) return
    const timer = setInterval(() => {
      time.s += 1
      if (time.s === 59) {
        time.s = 0
        time.m += 1
      }
      if (time.m === 59) {
        time.m = 0
        time.h += 1
      }
      setSec(time.s)
      setMin(time.m)
      setHrs(time.h)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [pause])

  const goSite = () => {
    window.open('http://shabit.site/')
  }

  const setTimer = () => {
    setPause(!pause)
  }
  return (
    <>
      <Wrapper>
        <Logo src={`${process.env.PUBLIC_URL}/assets/logo-pink.png`} />
        <Nickname>
          {user.nickname}
          <Email>{user.email}</Email>
        </Nickname>

        <Time>
          총 이용 시간
          <Timer>
            {String(hrs).padStart(2, '0')} : {String(min).padStart(2, '0')} :{' '}
            {String(sec).padStart(2, '0')}
          </Timer>
        </Time>

        <Button onClick={setTimer}>
          {pause ? <BsFillPlayCircleFill /> : <BsPauseCircleFill />}
        </Button>

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

const Button = styled.button`
  & > svg {
    font-size: 2.2rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
`
