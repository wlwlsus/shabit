import React from 'react';
import styled from 'styled-components';

import Container from '../atoms/Container';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

import { BsFillPlayBtnFill } from 'react-icons/bs';

export default function StartBtn() {
  return (
    <Container
      size={'smsquare'}
      border={'rounded'}
      shadow={'shadow'}
      edge={'secondary'}
      children={
        <ButtonWrapper>
          <Button icon={<BsFillPlayBtnFill />} color={'primary'} size={'lg'} />
          <Label text={'자세교정 시작하기'} color={'primary'} size={'xs'} />
        </ButtonWrapper>
      }
    />
  );
}

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
