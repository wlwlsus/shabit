import React, { useState } from 'react';
import styled from 'styled-components';
import VideoFilterDropdown from './VideoFilterDropdown';
const VideoFilter = () => {
  const [mode, setMode] = useState('w');
  const handleMode = (e) => {
    const newMode = e.target.id;
    setMode(newMode);
  };
  return (
    <FilterContainer>
      <VideoFilterDropdown />
      <RadioWrapper>
        <label htmlFor="ALL">
          <Checkbox name="mode" id="ALL" defaultChecked onChange={handleMode} />
          전체
        </label>
        <label htmlFor="3분">
          <Checkbox name="mode" id="3분" onChange={handleMode} />
          3분
        </label>
        <label htmlFor="5분">
          <Checkbox name="mode" id="5분" onChange={handleMode} />
          5분
        </label>
        <label htmlFor="10분">
          <Checkbox name="mode" id="10분" onChange={handleMode} />
          10분
        </label>
      </RadioWrapper>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  margin-top: 0.5rem;

  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RadioWrapper = styled.div`
  width: 17.5rem;
  display: flex;
  justify-content: space-evenly;
  margin-top: 0.1rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;

  & > label {
    &:hover {
      cursor: pointer;
    }
  }
`;
export default VideoFilter;

const Checkbox = styled.input.attrs({ type: 'radio' })`
  margin-right: 0.5rem;
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.color.secondary};
  cursor: pointer;
  &:checked {
    background-color: ${(props) => props.theme.color.primary};
  }
`;

// import React from 'react';
// import { TiArrowSortedDown } from 'react-icons/ti';
// import styled from 'styled-components';
// const VideoFilter = () => {
//   return (
//     <div>
//       <StyledDropBox>
//         <div className="select-box">
//           <div
//             className="select-box__current"
//             tabIndex={1}
//             // onClick={(e) => e.target?.value && setCategoryInput(e.target.value)}
//           >
//             <div className="select-box__value">
//               <input
//                 className="select-box__input"
//                 type="radio"
//                 id={0}
//                 defaultValue={1}
//                 name="Ben"
//                 defaultChecked="checked"
//               />
//               <p className="select-box__input-text">목</p>
//             </div>
//             <div className="select-box__value">
//               <input
//                 className="select-box__input"
//                 type="radio"
//                 id={1}
//                 defaultValue={2}
//                 name="Ben"
//               />
//               <p className="select-box__input-text">허리</p>
//             </div>
//             <div className="select-box__value">
//               <input
//                 className="select-box__input"
//                 type="radio"
//                 id={2}
//                 defaultValue={3}
//                 name="Ben"
//               />
//               <p className="select-box__input-text">전신</p>
//             </div>
//             <TiArrowSortedDown className="select-box__icon" />
//           </div>
//           <ul className="select-box__list">
//             <li>
//               <label
//                 className="select-box__option"
//                 htmlFor={0}
//                 aria-hidden="true"
//               >
//                 목
//               </label>
//             </li>
//             <li>
//               <label
//                 className="select-box__option"
//                 htmlFor={1}
//                 aria-hidden="true"
//               >
//                 허리
//               </label>
//             </li>
//             <li>
//               <label
//                 className="select-box__option"
//                 htmlFor={2}
//                 aria-hidden="true"
//               >
//                 전신
//               </label>
//             </li>
//           </ul>
//         </div>
//       </StyledDropBox>
//     </div>
//   );
// };

// export default VideoFilter;
// const Title = styled.div``;

// const StyledDropBox = styled.div`
//   text-align: center;
//   width: 8rem;
//   z-index: 1;
//   background-color: ${(props) => props.theme.color.secondary};
//   border: 0.1rem solid ${(props) => props.theme.color.primary};
//   border-right: none;
//   border-radius: 1rem 0 0 1rem;
//   .select-box {
//     position: relative;
//     display: block;
//     width: 100%;
//     margin: 0 auto;
//     font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial',
//       sans-serif;
//     font-size: 18px;
//     font-weight: bold;
//     color: ${(props) => props.theme.color.primary};
//   }
//   .select-box__current {
//     position: relative;
//     cursor: pointer;
//     outline: none;
//   }
//   .select-box__current:focus + .select-box__list {
//     opacity: 1;
//     animation-name: none;
//   }
//   .select-box__current:focus + .select-box__list .select-box__option {
//     cursor: pointer;
//   }
//   .select-box__current:focus .select-box__icon {
//     transform: translateY(-50%) rotate(180deg);
//   }
//   .select-box__icon {
//     position: absolute;
//     top: 50%;
//     right: 0.2rem;
//     transform: translateY(-50%);
//     width: 1rem;
//     opacity: 0.3;
//     transition: 0.2s ease;
//   }
//   .select-box__value {
//     display: flex;
//   }
//   .select-box__input {
//     display: none;
//   }
//   .select-box__input:checked + .select-box__input-text {
//     display: block;
//   }
//   .select-box__input-text {
//     display: none;
//     width: 100%;
//     margin: 0;
//     padding: 15px;
//   }
//   .select-box__list {
//     position: absolute;
//     width: 100%;
//     padding: 0;
//     list-style: none;
//     opacity: 0;
//     animation-name: HideList;
//     animation-duration: 0.5s;
//     animation-delay: 0.5s;
//     animation-fill-mode: forwards;
//     animation-timing-function: step-start;
//     box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
//   }
//   .select-box__option {
//     display: block;
//     border: 0.1rem solid ${(props) => props.theme.color.primary};
//     border-radius: 1rem;
//     padding: 15px;
//     background-color: ${(props) => props.theme.color.lightGrayColor};
//   }
//   .select-box__option:hover,
//   .select-box__option:focus {
//     color: #546c84;
//     background-color: #fbfbfb;
//   }
//   @keyframes HideList {
//     from {
//       transform: scaleY(1);
//     }
//     to {
//       transform: scaleY(0);
//     }
//   }
// `;
