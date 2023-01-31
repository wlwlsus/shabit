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
  },
  // fadeEffect: {
  //   fadeIn: keyframes`
  //   from {
  //     opacity: 0;
  //     transform: translateX(5%, 2.5%, 0);
  //   }
  //   to {
  //     opacity: 1;
  //     transform: translateZ(0);
  //   }
  //   `,
  //   fadeOut: keyframes`
  //   0% {
  //     visibility: visible;
  //     opacity: 1;
  //     transform: translateZ(0);
  //   }
  //   100% {
  //     visibility: hidden;
  //     opacity: 0;
  //     transform: translate3d(0, -10%, 0);
  //   }
  //   `,
  // },
};

export default animation;
export const { loadEffect } = animation;
