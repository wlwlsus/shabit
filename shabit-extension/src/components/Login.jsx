import React, { useState } from 'react'
import styled from 'styled-components'
import { goTo } from 'react-chrome-extension-router'
import { HiArrowRightCircle } from 'react-icons/hi2'
import { authLogin } from '../utils/authLogin'
import Tracking from './Tracking'

export default function Login() {
  const [errMsg, setErrMsg] = useState()
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    autoLogin: false,
  })

  const goSite = () => {
    window.location.href = 'http://shabit.site/'
  }

  const onChangeHandler = (e) => {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onLogin = () => {
    const { email, password } = inputs
    authLogin(email, password)
      .then(() => {
        goTo(Tracking)
      })
      .catch((err) => {
        setErrMsg(err.message)
      })
  }

  return (
    <Popup>
      <Logo src={`${process.env.PUBLIC_URL}/assets/logo-pink.png`} />
      {errMsg ? <Err> {errMsg}</Err> : null}
      <InputWrapper>
        <Input
          type="email"
          name="email"
          onChange={onChangeHandler}
          placeholder="아이디"
        />
        <Input
          type="password"
          name="password"
          onChange={onChangeHandler}
          placeholder="비밀번호"
        />
      </InputWrapper>
      <IconWrapper>
        로그인 <HiArrowRightCircle onClick={onLogin} />
      </IconWrapper>
      <Text onClick={goSite}>홈페이지로 이동하기</Text>
    </Popup>
  )
}

const Popup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};

  &:hover {
    cursor:default;
   }
  }
`

const Logo = styled.img`
  margin-top: 1rem;
  width: 7rem;
`

const Err = styled.div`
  color: ${(props) => props.theme.color.redColor};
  font-size: 0.7rem;
  position: absolute;
  top: 9%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  font-size: 1.05rem;
  width: 10rem;
  padding: 0.5rem;
  margin: 0.2rem 0;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  background-color: ${(props) => props.theme.color.secondary};

  &::placeholder {
    color: ${(props) => props.theme.color.grayColor};
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    font-size: 2rem;
    transition: all 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
`

const Text = styled.div`
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
  }
`
