import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Button from '../atoms/Button';

import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { FaGithubSquare } from 'react-icons/fa';
import { GrFacebook } from 'react-icons/gr';

const Social = () => {
  return (
    <Wrapper>
      <Label
        text={'다른 계정으로 로그인하기'}
        size={'xs'}
        color={'secondary'}
      />
      <IconWrapper>
        <Button icon={<FcGoogle />} size={'md'} />
        <Button icon={<SiKakaotalk />} size={'md'} color={'yellow'} />
        <Button icon={<FaGithubSquare />} size={'md'} />
        <Button icon={<GrFacebook />} size={'md'} bg={'white'} color={'blue'} />
      </IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 60%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-evenly;
`;

export default Social;
