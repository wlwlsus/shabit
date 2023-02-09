import { GlobalStyle, theme } from './GlobalStyles'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import { HiArrowRightCircle } from 'react-icons/hi2'

function App() {
  //   const onLogin = () => {
  //     Auth.login(email, password)
  //       .then(({ user, accessToken }) => {
  //         navigate('/main');
  //       })
  //       .catch((err) => {
  //         setMessage(err.message);
  //       });
  //   };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle bg={theme.color.whiteColor} />
      <Popup>
        <Logo src={`${process.env.PUBLIC_URL}/assets/logo-pink.png`} />
        <InputWrapper>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
        </InputWrapper>
        <IconWrapper>
          로그인 <HiArrowRightCircle />
        </IconWrapper>
        <Text>홈페이지로 이동하기</Text>
      </Popup>
    </ThemeProvider>
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
  color: ${(props) => props.theme.color.primary};

  &:hover {
    cursor: pointer;
  }
`

export default App
