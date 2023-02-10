import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { postVod } from '../../../services/admin/post';
import { TiArrowSortedDown } from 'react-icons/ti';
import useDebounce from '../../../utils/useDebounce';

const VideoInput = ({ scrollProp, setScrollProp }) => {
  const [categoryInput, setCategoryInput] = useState(1);
  const [urlInput, setUrlInput] = useState('');
  const [videoId, setVideoId] = useState('');
  const [hasImage, setHasImage] = useState(false);

  const debouncedInput = useDebounce(urlInput, 300);
  const myRef = useRef();
  useEffect(() => {
    setHasImage(false);
    if (!debouncedInput) return setVideoId('');
    if (debouncedInput.includes('youtube')) {
      const inputArray = debouncedInput.split('?v=');
      if (inputArray.length > 1) {
        const newId = inputArray[1].split('&')[0];
        setVideoId(newId);
      } else {
        setVideoId('');
      }
    }
  }, [debouncedInput]);

  const onLoad = (e) => {
    if (~~e.target.naturalWidth <= 120) {
      setHasImage(false);
      return;
    }
    setHasImage(true);
  };

  return (
    <VideoInputWrapper>
      <StyledDropBox>
        <div className="select-box">
          <div
            className="select-box__current"
            tabIndex={1}
            onClick={(e) => e.target?.value && setCategoryInput(e.target.value)}
          >
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id={0}
                defaultValue={1}
                name="Ben"
                defaultChecked="checked"
              />
              <p className="select-box__input-text">목 운동</p>
            </div>
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id={1}
                defaultValue={2}
                name="Ben"
              />
              <p className="select-box__input-text">허리 운동</p>
            </div>
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id={2}
                defaultValue={3}
                name="Ben"
              />
              <p className="select-box__input-text">전신 운동</p>
            </div>
            <TiArrowSortedDown className="select-box__icon" />
          </div>
          <ul className="select-box__list">
            <li>
              <label
                className="select-box__option"
                htmlFor={0}
                aria-hidden="true"
              >
                목 운동
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor={1}
                aria-hidden="true"
              >
                허리 운동
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor={2}
                aria-hidden="true"
              >
                전신 운동
              </label>
            </li>
          </ul>
        </div>
      </StyledDropBox>
      <StyledInputTag>
        <input
          type="text"
          className="type-2"
          placeholder="YOUTUBE URL을 입력하세요"
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value);
          }}
        />
      </StyledInputTag>
      <StyledButton
        type="button"
        className={hasImage && 'buttonVisible'}
        onClick={() => {
          if (!hasImage) return;
          postVod(~~categoryInput || 1, urlInput.split('&')[0]).then(() => {
            setUrlInput('');
            setCategoryInput(1);
            setHasImage(false);
            setScrollProp({ ...scrollProp, page: 0 });
          });
        }}
      >
        추가하기
      </StyledButton>
      {videoId ? (
        <ThumbNailFloat>
          <Thumbnail
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
            ref={myRef}
            onLoad={onLoad}
          />
          <Thumbnail src={`https://img.youtube.com/vi/${videoId}/1.jpg`} />
          <Thumbnail src={`https://img.youtube.com/vi/${videoId}/2.jpg`} />
          <Thumbnail src={`https://img.youtube.com/vi/${videoId}/3.jpg`} />
        </ThumbNailFloat>
      ) : (
        ''
      )}
    </VideoInputWrapper>
  );
};

export default VideoInput;

const VideoInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0rem;
  .buttonVisible {
    background-color: ${(props) => props.theme.color.primary};
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.whiteColor};
  cursor: default;
  color: ${(props) => props.theme.color.whiteColor};
  width: 7rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  font-weight: bold;
  &:hover {
  }
`;
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

const StyledInputTag = styled.div`
  width: 52rem;

  input {
    display: block;
    width: 100%;
    padding: 1rem;
    border: 0.1rem solid ${(props) => props.theme.color.primary};
    border-right: none;
    border-left: none;
    transition: 0.3s box-shadow;
  }
`;

const ThumbNailFloat = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: -3.9rem;
  left: 7.4rem;
`;

const Thumbnail = styled.img`
  width: 7.1rem;
  height: 3.9rem;
  margin-left: 0.5rem;
  object-fit: cover;
`;