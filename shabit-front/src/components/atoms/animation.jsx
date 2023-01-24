import React from 'react'
import { keyframes } from 'styled-components';

export default function animation() {
  return (
    <div>animation</div>
  )
}

const bigger = keyframes`
  from {
    scale:1
  }
  to {
    scale:1.1
  }
`;

const clicked = keyframes`
0%{
  transform: translateY(0);    
}

50% {
  transform: translateY(0.5rem);
}
100% {
  transform: translateY(0);
}
`;

&:hover {
  animation: ${bigger} 0.3s ease-in-out;
  animation-fill-mode: forwards;
}

&:active {
  animation: ${clicked} 2s ease infinite;
}
