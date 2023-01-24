import React from 'react';

import Button from '../atoms/Button';

export default function Tab({ text, size }) {
  return <Button text={text} size={size} shadow={'shadow'} border={'tab'} />;
}
