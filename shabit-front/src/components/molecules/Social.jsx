import React from 'react';
import styled from 'styled-components';

import Label from '../atoms/Label';
import Button from '../atoms/Button';

import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk, SiNaver } from 'react-icons/si';

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
        <Button
          icon={<SiKakaotalk />}
          size={'md'}
          color={'yellow'}
          bg={'black'}
        />
        <Button icon={<SiNaver />} size={'md'} color={'green'} bg={'white'} />
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
  width: 50%;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-evenly;
`;

export default Social;
