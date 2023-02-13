import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'

export default function Tracking({ user }) {
  const [start, setStart] = useState()
  const [time, setTime] = useState()
  let interval = useRef(null)
  // background storage에서 시간 정보 가져옴
  const getTime = () => {
    chrome.runtime.sendMessage(
      {
        action: 'getTime',
      },
      (response) => {
        setTime(response)
      }
    )
  }
  // status : pause or start
  const getStatus = () => {
    chrome.runtime.sendMessage(
      {
        action: 'getStatus',
      },
      (response) => {
        setStart(response)
      }
    )
  }

  // 첫 렌더링시 storage에 저장된 time, status 불러오기
  useEffect(() => {
    getTime()
    getStatus()
  }, [])

  // background stop & pause 메세지 보냄
  useEffect(() => {
    if (start) {
      chrome.runtime.sendMessage({
        action: 'startTimer',
      })
      interval.current = setInterval(getTime, 900)
    } else {
      chrome.runtime.sendMessage({
        action: 'pauseTimer',
      })
    }
    return () => {
      clearInterval(interval.current)
    }
  }, [start])

  // 타이머 멈춤 & 재생
  const setTimer = () => {
    setStart(!start)
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
          {time && (
            <Timer>
              {String(time?.h).padStart(2, '0')} :
              {String(time?.m).padStart(2, '0')} :
              {String(time?.s).padStart(2, '0')}
            </Timer>
          )}
        </Time>

        <Button onClick={setTimer}>
          {start ? <BsPauseCircleFill /> : <BsFillPlayCircleFill />}
        </Button>

        <Text
          onClick={() => {
            window.open('http://shabit.site/')
          }}
        >
          홈페이지로 이동하기
        </Text>
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
  height: 1.5rem;
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
  }
`
