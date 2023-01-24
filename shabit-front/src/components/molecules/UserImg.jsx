import React from 'react';

import Container from '../atoms/Container';
import Img from '../atoms/Img';

export default function UserImg() {
  return (
    <Container size={'circle'} bg={'secondary'}>
      <Img assets={false} src={'/assets/logo-pink.png'} />
    </Container>
  );
}
