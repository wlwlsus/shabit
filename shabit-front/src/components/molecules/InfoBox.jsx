import React from 'react';

import Container from '../atoms/Container';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

export default function InfoBox({ text, icon }) {
  return (
    <Container bg={'secondary'} border={'rounded'} shadow={'shadow'}>
      <Icon icon={icon} color={'primary'} />
      <Text text={text} color={'primary'} />
    </Container>
  );
}
