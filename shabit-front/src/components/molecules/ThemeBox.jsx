import React from 'react';

import styled from 'styled-components';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

export default function ThemeBox() {
  return (
    <Wrapper>
      <Text text={'테마'} />
      <Button text={'DARK'} size={'xs'} />
      <Button text={'BLUE'} size={'xs'} />
      <Button text={'PINK'} size={'xs'} />
      <Button text={'GREEN'} size={'xs'} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
