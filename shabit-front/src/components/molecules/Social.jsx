import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Button from '../atoms/Button';

import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { FaGithubSquare, FaFacebook } from 'react-icons/fa';

const Social = () => {
  return (
    <Wrapper>
      <Label text={'다른 계정으로 로그인하기'} size={'sm'} />
      <IconWrapper>
        <Button icon={<FcGoogle />} size={'md'} />
        <Button icon={<SiKakaotalk />} size={'md'} />
        <Button icon={<FaGithubSquare />} size={'md'} />
        <Button icon={<FaFacebook />} size={'md'} />
      </IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  display: flex;
`;

export default Social;
