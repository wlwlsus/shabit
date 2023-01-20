import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from '../atoms/Button';
import Label from '../atoms/Label';

import { RiUser3Line, RiUserAddLine, RiBookmark2Line } from 'react-icons/ri';

const LandingSidebar = () => {
  const navigate = useNavigate();

  const toIntro = () => {
    navigate('/');
  };

  const toLogin = () => {
    navigate('/login');
  };

  const toSignup = () => {
    navigate('/signup');
  };

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          icon={<RiUser3Line />}
          color={'gray'}
          size={'md'}
          onClick={toLogin}
        />
        <Label text={'로그인'} color={'gray'} size={'xs'} />
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          icon={<RiUserAddLine />}
          color={'gray'}
          size={'md'}
          onClick={toSignup}
        />
        <Label text={'회원가입'} color={'gray'} size={'xs'} />
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          icon={<RiBookmark2Line />}
          color={'gray'}
          size={'md'}
          onClick={toIntro}
        />
        <Label text={'앱소개'} color={'gray'} size={'xs'} />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 20%;
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default LandingSidebar;
