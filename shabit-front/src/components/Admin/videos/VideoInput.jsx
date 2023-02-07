import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { postVod } from '../../../services/admin/post';
import { theme } from '../../../styles/GlobalStyles';
import { TiArrowSortedDown } from 'react-icons/ti';
import useDebounce from '../../../utils/useDebounce';

const VideoInput = () => {
  const [categoryInput, setCategoryInput] = useState(1);
  const [urlInput, setUrlInput] = useState('');
  const [videoId, setVideoId] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const buttonStyle = hasImage
    ? {
        backgroundColor: theme.color.primary,
        cursor: 'pointer',
      }
    : {};
  // const [buttonStyle, setButtonStyle] = useState({});
  const debouncedInput = useDebounce(urlInput, 300);
  const myRef = useRef();
  //이미지 온로드 이벤트 발생하면
  useEffect(() => {
    setHasImage(false);
    if (!debouncedInput) return setVideoId('');
    if (debouncedInput.includes('youtube')) {
      // const newList = debouncedInput.split('?v=')[1]?.split('&')[0];
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
    //만일 유튜브 썸네일 이미지의 넓이가 120이라면...
    //썸네일 이미지가 없어서 404 사진이 뜬거임!!
    //모달창 지우고, 이미지 없다고 함
    if (~~e.target.naturalWidth <= 120) {
      setHasImage(false);
      // setVideoId('');
      return;
    }
    setHasImage(true);
  };

  return (
    <VideoInputWrapper>
      <StyledDropBox>
        <div className="select-box">
          <div className="select-box__current" tabIndex={1}>
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
            {/* <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id={3}
                defaultValue={4}
                name="Ben"
              />
              <p className="select-box__input-text">Honey</p>
            </div>
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id={4}
                defaultValue={5}
                name="Ben"
              />
              <p className="select-box__input-text">Toast</p>
            </div> */}
            {/* <img
          className="select-box__icon"
          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
          alt="Arrow Icon"
          aria-hidden="true"
        /> */}
            <TiArrowSortedDown className="select-box__icon" />
          </div>
          <ul className="select-box__list">
            <li>
              <label
                className="select-box__option"
                htmlFor={0}
                aria-hidden="aria-hidden"
              >
                목 운동
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor={1}
                aria-hidden="aria-hidden"
              >
                허리 운동
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor={2}
                aria-hidden="aria-hidden"
              >
                전신 운동
              </label>
            </li>
            {/* <li>
              <label
                className="select-box__option"
                htmlFor={3}
                aria-hidden="aria-hidden"
              >
                Honey
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor={4}
                aria-hidden="aria-hidden"
              >
                Toast
              </label>
            </li> */}
          </ul>
        </div>
      </StyledDropBox>

      {/* <input
      type="text"
      name="urlInput"
      placeholder="유튜브 URL을 입력하세요"
      onChange={(e) => {
        setUrlInput(e.target.value);
      }}
    ></input> */}
      <StyledInputTag>
        <input
          type="text"
          class="type-2"
          placeholder="YOUTUBE URL을 입력하세요"
          onChange={(e) => {
            setUrlInput(e.target.value);
          }}
        />
      </StyledInputTag>
      <StyledButton
        type="button"
        style={buttonStyle}
        onClick={async () => {
          if (!hasImage) return;
          await postVod(~~categoryInput || 1, urlInput.split('&')[0]);
          setHasImage(false);
          setUrlInput('');
          setCategoryInput(1);
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
  margin-top: 1rem;
  /* box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.1); */
`;

const StyledButton = styled.button`
  /* margin-top: 0.5rem; */
  background-color: ${theme.color.grayColor};
  cursor: default;
  color: ${theme.color.whiteColor};
  padding: 1rem;
  border-radius: 0 1rem 1rem 0;
  /* border-radius: 4rem; */
  font-weight: bold;
  &:hover {
  }
`;
//https://codepen.io/miniven/pen/ZJydge
const StyledDropBox = styled.div`
  /* border-radius: 36px; */
  text-align: center;
  width: 8rem;
  z-index: 1;
  /* background-color: ${theme.color.primary}; */
  background-color: ${theme.color.secondary};
  border-radius: 1rem 0 0 1rem;
  /* display: inline-block; */
  /* overflow: hidden; */
  /* background: #cccccc; */
  /* border: 1px solid #cccccc; */
  .select-box {
    position: relative;
    display: block;
    width: 100%;
    margin: 0 auto;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial',
      sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: ${theme.color.primary};
  }
  .select-box__current {
    position: relative;
    /* box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1); */
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
    right: 15px;
    transform: translateY(-50%);
    width: 20px;
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
    /* background-color: ${theme.color.primary}; */
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
    background-color: ${theme.color.lightGrayColor};
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

// https://blog.logrocket.com/how-to-style-forms-with-css-a-beginners-guide/
const StyledInputTag = styled.div`
  width: 52rem;
  height: 2rem;
  input {
    display: block;
    width: 100%;
    /* margin: 10px 0; */
    padding: 1rem;
    padding-bottom: 1.01rem;
    /* border-radius: 2rem; */
    background-color: ${theme.color.lightGrayColor};
    border: 0;
    /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.3); */
    transition: 0.3s box-shadow;
  }
  /* input:hover {
    background-color: #fbecec;
  } */
`;

const ThumbNailFloat = styled.div`
  /* width: 30rem; */
  display: flex;
  justify-content: space-around;
  position: absolute;
  background-color: ${theme.color.grayColor};
  top: 4.2rem;
  left: 9rem;
`;

const Thumbnail = styled.img`
  width: 7.1rem;
  height: 3.9rem;
  object-fit: cover;
`;
