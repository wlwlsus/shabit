import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteVod } from '../../../services/admin/delete';
import { fetchVods, retrieveVods } from '../../../services/admin/get';
import { postVod } from '../../../services/admin/post';
import { typedUseSelector } from '../../../store';
import { theme } from '../../../styles/GlobalStyles';
import { loadEffect } from '../../common/animation';
import VideoCard from './VideoCard';
import { TiArrowSortedDown } from 'react-icons/ti';

export default function VideoSettings() {
  useEffect(() => {
    retrieveVods();
  }, []);
  const [urlInput, setUrlInput] = useState('');
  const [categoryInput, setCategoryInput] = useState(1);
  const vodsList = typedUseSelector((state) => {
    return state.admin.videoList;
  });

  /*
    영상 카테고리 리스트 조회
    영상 리스트 조회
    영상 삭제
    영상 등록

    
  */

  // postVod,
  // deleteVod,
  // retrieveVods,
  // videoCategories: [
  //   {
  //     categoryId: 1,
  //     name: '목 스트레칭',
  //   },
  //   {
  //     categoryId: 2,
  //     name: '허리 스트레칭',
  //   },
  //   {
  //     categoryId: 3,
  //     name: '전신 스트레칭',
  //   },
  // ],
  const [dropDown, setDropDown] = useState('none');
  const [mode, setMode] = useState('Weekly');
  const [item, setItem] = useState('Monthly');

  const handleDropdown = () => {
    if (dropDown === '') {
      setDropDown('none');
    } else {
      setDropDown('');
    }
  };

  const handleMode = (e) => {
    const selected = e.target.innerText;
    setMode(e.target.innerText);
    setDropDown('none');

    switch (selected) {
      case 'Weekly':
        setItem('Monthly');
        break;
      case 'Monthly':
        setItem('Weekly');
        break;
      default:
        setItem('Monthly');
        break;
    }
  };

  return (
    <VodWrapper>
      <PostWrapper>
        <form>
          {/* <select
            name="categoryInput"
            id="categoryInput"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          >
            <option value="1">목 스트레칭</option>
            <option value="2">허리 스트레칭</option>
            <option value="3">전신 스트레칭</option>
          </select> */}
          {/* <DropDownWrapper>
            <DropDown onClick={handleDropdown}>
              스트레칭 종류
              <TiArrowSortedDown />
            </DropDown>
            <DropDownItem onClick={handleMode} style={{ display: dropDown }}>
              반가워
            </DropDownItem>
            <DropDownItem onClick={handleMode} style={{ display: dropDown }}>
              나는
            </DropDownItem>
            <DropDownItem onClick={handleMode} style={{ display: dropDown }}>
              {' '}
              천재야
            </DropDownItem>
          </DropDownWrapper> */}
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
                    <p className="select-box__input-text">Cream</p>
                  </div>
                  <div className="select-box__value">
                    <input
                      className="select-box__input"
                      type="radio"
                      id={1}
                      defaultValue={2}
                      name="Ben"
                    />
                    <p className="select-box__input-text">Cheese</p>
                  </div>
                  <div className="select-box__value">
                    <input
                      className="select-box__input"
                      type="radio"
                      id={2}
                      defaultValue={3}
                      name="Ben"
                    />
                    <p className="select-box__input-text">Milk</p>
                  </div>
                  <div className="select-box__value">
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
                  </div>
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
                      Cream
                    </label>
                  </li>
                  <li>
                    <label
                      className="select-box__option"
                      htmlFor={1}
                      aria-hidden="aria-hidden"
                    >
                      Cheese
                    </label>
                  </li>
                  <li>
                    <label
                      className="select-box__option"
                      htmlFor={2}
                      aria-hidden="aria-hidden"
                    >
                      Milk
                    </label>
                  </li>
                  <li>
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
                  </li>
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
              <input type="text" class="type-2" />
            </StyledInputTag>
            <button
              type="button"
              onClick={async () => {
                await postVod(~~categoryInput || 1, urlInput.split('&')[0]);
                setUrlInput(1);
                setCategoryInput('');
              }}
            >
              영상 추가하기
            </button>
          </VideoInputWrapper>
        </form>
      </PostWrapper>
      <ButtonContainer>
        <P>영상 리스트</P>
        <StyledButton
          onClick={() => {
            retrieveVods();
          }}
        >
          전체 불러오기
        </StyledButton>
      </ButtonContainer>
      <ListWrapper>
        {/* <RefreshIcon> */}
        {/* <img src="/assets/refresh-arrow.png"></img> */}

        {/* </RefreshIcon> */}
        {vodsList.map((element, idx) => {
          return (
            // <ListContainer key={String(idx) + Date().toString().slice(0, 2)}>
            //   <img src={element.thumbnail} style={{ maxWidth: '4rem' }}></img>
            //   <div>
            //     카테고리: {element.categoryId} {element.name}
            //   </div>
            //   <TextDiv>제목: {element.title}</TextDiv>
            //   <div>영상길이: {element.originalLength}</div>
            //   {/* <div>비디오ID: {element.videoId}</div> */}

            //   <button
            //     onClick={async () => {
            //       await deleteVod(element.videoId);
            //     }}
            //   >
            //     삭제
            //   </button>
            // </ListContainer>
            <VideoCard
              key={element.videoId}
              thumbnail={element.thumbnail}
              categoryId={element.category.categoryId}
              title={element.title}
              originalLength={element.originalLength}
              videoId={element.videoId}
            />
            // <VideoCard />
            // <VideoCard />
          );
        })}
      </ListWrapper>
    </VodWrapper>
  );
}

const ListWrapper = styled.div`
  max-height: 22rem;
  /* padding-top: 4rem; */
  max-width: 100%;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: space-between;
  //스크롤바 숨기기 https://wooaoe.tistory.com/49
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListContainer = styled.li`
  display: flex;
`;

const PostWrapper = styled.div`
  margin-top: 2rem;
  position: relative;
  border: black;
  height: 7rem;
`;

const VodWrapper = styled.div`
  /* border: 0.2rem solid ${theme.color.secondary};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor}; */

  display: flex;
  flex-direction: column;

  animation: 0.8s ease-in ${loadEffect.up};
  position: relative;

  /* & > div:nth-child(1) {
    margin: 1rem 1.5rem 0 1rem;
  }

  & > div:nth-child(2) {
    position: absolute;
    bottom: 9%;
    left: 80%;
  } */
`;

const TextDiv = styled.div`
  width: 30rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// const VideoList = styled.div`
//   padding: 0.3rem;
//   margin: 0.7rem;
//   color: ${theme.color.primary};
//   font-weight: bold;
//   border-radius: 0.5rem;
//   border: 0.2rem solid ${theme.color.secondary};
//   box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};
// `;

// const RefreshIcon = styled.div`
//   :hover {
//     -webkit-animation: rotating 2s linear infinite;
//   }
//   @-webkit-keyframes rotating {
//     from {
//       -webkit-transform: rotate(0deg);
//     }
//     to {
//       -webkit-transform: rotate(360deg);
//     }
//   }
// `;

const StyledButton = styled.button`
  margin-bottom: 0.5rem;
  background-color: ${theme.color.blueColor};
  color: ${theme.color.whiteColor};
  padding: 0.3rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: x-small;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
  /* float: right; */
  /* z-index: 10; */
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 0.5rem;
  margin-right: 2rem;
  margin-left: auto; */

  /* position: absolute; */
  /* display: flex;
  width: 100%; */
  /* text-align: left; */
  /* right: 1.5rem; */
  /* top: 6.5rem;
  right: 1.5rem; */
`;

const P = styled.span`
  color: ${theme.color.primary};
  font-size: 1.05rem;
  font-weight: bolder;
  margin: 0 0.3rem;
  position: relative;
`;

const DropDownWrapper = styled.div`
  text-align: center;
  align-self: start;
  margin-left: 3rem;
`;

const DropDown = styled.ul`
  width: 6rem;
  border: 0.1rem solid ${theme.color.primary};
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const DropDownItem = styled.div`
  width: 6rem;
  border: 0.1rem solid ${theme.color.primary};
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;

  position: absolute;
  left: 7.1%;
  top: 40%;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }
`;

const VideoInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// https://blog.logrocket.com/how-to-style-forms-with-css-a-beginners-guide/
const StyledInputTag = styled.div`
  width: 50rem;
  height: 2rem;
  input {
    display: block;
    width: 100%;
    /* margin: 10px 0; */
    padding: 1rem;
    border-radius: 2rem;
    background-color: #fafafa;
    border: 0;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    transition: 0.3s box-shadow;
  }
  input:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
`;

const InputTag = styled.div`
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
  }
  .type-1 {
    border-radius: 10px;
    border: 1px solid #eee;
    transition: 0.3s border-color;
  }
  .type-1:hover {
    border: 1px solid #aaa;
  }

  .type-2 {
    background-color: #fafafa;
    border: 0;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    transition: 0.3s box-shadow;
  }
  .type-2:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
  .type-3 {
    border: 1px solid #111;
    transition: 0.3s background-color;
  }
  .type-3:hover {
    background-color: #fafafa;
  }
`;

//https://codepen.io/miniven/pen/ZJydge
const StyledDropBox = styled.div`
  border-radius: 36px;
  text-align: center;
  width: 8rem;
  z-index: 1;
  background-color: ${theme.color.primary};
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
    color: ${theme.color.whiteColor};
  }
  .select-box__current {
    position: relative;
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
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
    background-color: ${theme.color.grayColor};
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
// // https://codepen.io/marcobesagni/pen/wXRywm
// const StyledDropBox = styled.div`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   .menu {
//     display: flex;
//     /* justify-content: center; */
//     /* align-items: center; */
//     width: 95%;
//     /* margin: 0 auto; */
//     font-family: 'Orbitron', sans-serif;
//   }

//   ol {
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     /* justify-content: center; */
//     width: 100%;
//     margin: 0 auto;
//     padding: 0.5em 0;
//     list-style: none;
//   }

//   .menu-item {
//     /* background: #444; */
//     /* padding: 1em 0.5em; */
//     position: relative;
//     /* border-bottom: 5px solid #999; */
//     /* margin: 0 0.1em; */
//     transition: border-bottom 0.23s ease-in-out, background 0.23s linear;
//     cursor: pointer;
//     /* min-width: 8em; */
//     text-align: center;
//   }
//   .menu-item[aria-haspopup='true'] {
//     /* border-bottom-color: #fc9b1b; */
//   }
//   .menu-item:hover,
//   .menu-item:focus-within {
//     /* border-bottom-color: #91d36b;
//     background: #333; */
//   }
//   .menu-item:hover .sub-menu,
//   .menu-item:hover .sub-menu:hover,
//   .menu-item:focus-within .sub-menu,
//   .menu-item:focus-within .sub-menu:hover {
//     visibility: visible;
//     opacity: 1;
//     display: flex;
//   }

//   .sub-menu {
//     /* flex-direction: column; */
//     align-items: flex-start;
//     position: absolute;
//     left: 0;
//     /* margin-top: 1em; */
//     visibility: hidden;
//     display: none;
//     opacity: 0;
//   }
//   .sub-menu .menu-item {
//     /* margin: 0.1em 0; */
//     padding: 1em;
//     width: 10em;
//     text-align: center;
//     z-index: 2;
//   }

//   a {
//     color: #fff;
//     text-decoration: none;
//     text-transform: uppercase;
//   }
//   a:focus {
//     outline: none;
//   }

//   @media (max-width: 690px) {
//     .menu {
//       /* width: 95%; */
//       /* font-size: 16px; */
//     }
//     .menu-item {
//       /* margin: 0.1em; */
//     }
//     .menu-item:nth-child(1) {
//       order: 0;
//     }
//     .menu-item:nth-child(2) {
//       order: 1;
//     }
//     .menu-item:nth-child(3) {
//       order: 3;
//     }
//     .menu-item:nth-child(4) {
//       order: 4;
//     }
//     .menu-item:nth-child(5) {
//       order: 2;
//     }
//   }

//   @media (max-width: 480px) {
//     .menu {
//       /* font-size: 12px; */
//     }
//   }
// `;
