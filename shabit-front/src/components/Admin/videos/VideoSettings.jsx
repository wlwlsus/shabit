import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { retrieveVods } from '../../../services/admin/get';
import { typedUseSelector } from '../../../store';
import { loadEffect } from '../../../styles/animation';
import VideoInput from './VideoInput';
import VideoList from './VideoList';

export default function VideoSettings() {
  const [scrollProp, setScrollProp] = useState({
    page: 0,
    category: 0,
    length: 0,
  });

  return (
    <VodWrapper>
      <>
        <PostWrapper>
          <VideoInput scrollProp={scrollProp} setScrollProp={setScrollProp} />
        </PostWrapper>
      </>
      <>
        <ButtonContainer>
          <VideoFilter setScrollProp={setScrollProp} scrollProp={scrollProp} />
        </ButtonContainer>
        <VideoList scrollProp={scrollProp} setScrollProp={setScrollProp} />
      </>
    </VodWrapper>
  );
}

const StyledDropBox = styled.div`
  text-align: center;
  width: 8rem;
  z-index: 1;
  background-color: ${(props) => props.theme.color.secondary};
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  border-right: none;
  border-radius: 1rem 0 0 1rem;
  .select-box {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial',
      sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme.color.primary};
  }
  .select-box__current {
    position: relative;
    cursor: pointer;
    outline: none;
  }
  .select-box__current:focus + .select-box__list {
    opacity: 1;
    animation-name: none;
  }
  .select-box__current:focus + .select-box__list .select-box__option {
    cursor: pointer;
  }
  .select-box__current:focus .select-box__icon {
    transform: translateY(-50%) rotate(180deg);
  }
  .select-box__icon {
    position: absolute;
    top: 50%;
    right: 0.2rem;
    transform: translateY(-50%);
    width: 1rem;
    opacity: 0.3;
    transition: 0.2s ease;
  }
  .select-box__value {
    display: flex;
  }
  .select-box__input {
    display: none;
  }
  .select-box__input:checked + .select-box__input-text {
    display: block;
  }
  .select-box__input-text {
    display: none;
    width: 100%;
    margin: 0;
    padding: 15px;
  }
  .select-box__list {
    position: absolute;
    width: 100%;
    padding: 0;
    list-style: none;
    opacity: 0;
    animation-name: HideList;
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  }
  .select-box__option {
    display: block;
    border: 0.1rem solid ${(props) => props.theme.color.primary};
    border-radius: 1rem;
    padding: 15px;
    background-color: ${(props) => props.theme.color.lightGrayColor};
  }
  .select-box__option:hover,
  .select-box__option:focus {
    color: #546c84;
    background-color: #fbfbfb;
  }
  @keyframes HideList {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0);
    }
  }
`;

const PostWrapper = styled.div`
  margin-top: 2.5rem;
  position: relative;
  border: black;
  height: 4.5rem;
`;

const VodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: 0.8s ease-in ${loadEffect.up};
  position: relative;
`;

const StyledButton = styled.button`
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.color.blueColor};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.3rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: x-small;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;
const ButtonContainer = styled.div`
  display: flex;
`;
