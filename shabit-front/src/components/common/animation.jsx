import { keyframes } from 'styled-components';

const animation = {
  loadEffect: {
    down: keyframes`
    0%{
      opacity: 0;
      transform: translateY(-5%);
    }
    50%{
      opacity: 0.5;
      transform: translateY(-2.5%);
    }
    100%{
      opacity: 1;
      transform: translateY(0%);
    }
  `,
    up: keyframes`
  0%{
    opacity: 0;
    transform: translateY(5%);
  }
  50%{
    opacity: 0.5;
    transform: translateY(2.5%);
  }
  100%{
    opacity: 1;
    transform: translateY(0%);
  }
  `,

    right: keyframes`
    0%{
      opacity: 0;
      transform: translateX(-8%);
    }
    50%{
      opacity: 0.5;
      transform: translateX(-4%);
    }
    100%{
      opacity: 1;
      transform: translateX(0);
    }
  `,

    left: keyframes`
    0%{
      opacity: 0;
      transform: translateX(5%);
    }
    50%{
      opacity: 0.5;
      transform: translateX(2.5%);
    }
    100%{
      opacity: 1;
      transform: translateX(0);
    }
  `,
    drop: keyframes`
    0%{
      transform: translateY(-30%);
    }
    50%{
      transform: translateY(-15%);
    }
    100%{
      opacity: 1;
      transform: translateY(0%);
    }
  `,
    lift: keyframes`
    0%{
      transform: translateY(0%);
    }
    50%{
      transform: translateY(-15%);
    }
    100%{
      opacity:0;
      transform: translateY(-30%);
    }`,
  },
};

export default animation;
export const { loadEffect } = animation;
