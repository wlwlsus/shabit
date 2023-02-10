import React, { useEffect, useRef, useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import styled from 'styled-components';

const VideoFilterDropdown = ({ scrollProp, setScrollProp }) => {
  const [Dropped, setDropped] = useState(false);
  const [selected, setSelected] = useState('');
  const categoryArray = ['전체', '목', '허리', '전신'];

  useEffect(() => {
    if (typeof selected !== 'number') return;
    setScrollProp({ ...scrollProp, category: selected, page: 0 });
  }, [selected]);

  const ref = useRef();
  const handleClickOutSide = (e) => {
    if (Dropped && !ref.current.contains(e.target)) {
      setDropped(false);
    }
  };

  useEffect(() => {
    if (Dropped) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return (
    <DropdownWrapper ref={ref}>
      <Selected
        onClick={() => {
          setDropped(!Dropped);
        }}
      >
        {typeof selected === 'number' ? categoryArray[selected] : '카테고리'}
        <span
          style={
            Dropped ? { transform: 'translateY(-50%) rotate(180deg)' } : {}
          }
        >
          <TiArrowSortedDown />
        </span>
      </Selected>
      <DropDownlist style={Dropped ? {} : { visibility: 'hidden' }}>
        {categoryArray.map((e, idx) => {
          return (
            <ListItem
              key={e}
              onClick={() => {
                setSelected(idx);
                setDropped(false);
              }}
            >
              {e}
            </ListItem>
          );
        })}
      </DropDownlist>
    </DropdownWrapper>
  );
};

export default VideoFilterDropdown;

const DropdownWrapper = styled.div`
  margin-left: 0.1rem;
  margin-right: 0.5rem;
  width: 6rem;
`;

const Selected = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  cursor: pointer;
  span {
    position: absolute;
    display: flex;
    top: 8.2rem;
    left: 4.9rem;
    font-size: 0.9rem;
    align-items: center;
    transform: translateY(-50%);
    width: 1rem;
    opacity: 0.7;
    transition: 0.2s ease;
  }
`;

const DropDownlist = styled.div`
  width: 6rem;
  position: absolute;
  z-index: 2;
`;

const ListItem = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  &:hover {
    background-color: ${(props) => props.theme.color.secondary};
  }
`;

// import React from 'react';
// import { TiArrowSortedDown } from 'react-icons/ti';
// import styled from 'styled-components';

// const VideoFilterDropdown = () => {
//   return (
//     <DropdownWrapper>
//       <Title>카테고리</Title>
//       <StyledDropBox>
//         <SelectBox>
//           <CurrentValue
//             tabIndex={1}
//             // onClick={(e) => e.target?.value && setCategoryInput(e.target.value)}
//           >
//             <Value>
//               <input
//                 type="radio"
//                 id={0}
//                 defaultValue={1}
//                 name="Ben"
//                 defaultChecked="checked"
//               />
//               <p>목</p>
//             </Value>
//             <Value>
//               <input type="radio" id={1} defaultValue={2} name="Ben" />
//               <p>허리</p>
//             </Value>
//             <Value>
//               <input type="radio" id={2} defaultValue={3} name="Ben" />
//               <p>전신</p>
//             </Value>
//             <TiArrowSortedDown className="select-box__icon" />
//           </CurrentValue>
//           <OptionList>
//             <Option>
//               <label
//                 htmlFor={0}
//                 aria-hidden="true"
//               >
//                 목
//               </label>
//             </Option>
//             <Option>
//               <label
//                 htmlFor={1}
//                 aria-hidden="true"
//               >
//                 허리
//               </label>
//             </Option>
//             <Option>
//               <label
//                 htmlFor={2}
//                 aria-hidden="true"
//               >
//                 전신
//               </label>
//             </Option>
//           </OptionList>
//         </SelectBox>
//       </StyledDropBox>
//     </DropdownWrapper>
//   );
// };

// export default VideoFilterDropdown;

// const DropdownWrapper = styled.div`
//   width: 6rem;
// `;

// const Title = styled.div`
//   text-align: center;
//   background-color: ${(props) => props.theme.color.secondary};
//   color: ${(props) => props.theme.color.primary};
//   font-weight: bold;
//   padding: 0.3rem;
//   border-radius: 0.5rem;
//   border: 0.1rem solid ${(props) => props.theme.color.primary};
//   box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
// `;

// const StyledDropBox = styled.div`
//   text-align: center;
//   width: 8rem;
//   z-index: 1;
//   background-color: ${(props) => props.theme.color.secondary};
//   border: 0.1rem solid ${(props) => props.theme.color.primary};
//   border-right: none;
//   border-radius: 1rem 0 0 1rem;
// `;

// const SelectBox = styled.div`
//   text-align: center;
//   background-color: ${(props) => props.theme.color.secondary};
//   color: ${(props) => props.theme.color.primary};
//   font-weight: bold;
//   padding: 0.3rem;
//   border-radius: 0.5rem;
//   border: 0.1rem solid ${(props) => props.theme.color.primary};
//   box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
//   &:focus .select-box__icon {
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
// `;

// const CurrentValue = styled.div`
//   position: relative;
//   cursor: pointer;
//   outline: none;
// `;

// const Value = styled.div`
//   display: flex;
//   & input {
//     display: none;
//     &:checked p {
//       display: block;
//     }
//   }
// `;

// const OptionList = styled.div`
//   position: absolute;
//   width: 100%;
//   padding: 0;
//   list-style: none;
//   opacity: 0;
//   animation-name: HideList;
//   animation-duration: 0.5s;
//   animation-delay: 0.5s;
//   animation-fill-mode: forwards;
//   animation-timing-function: step-start;
//   box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
//   @keyframes HideList {
//     from {
//       transform: scaleY(1);
//     }
//     to {
//       transform: scaleY(0);
//     }
//   }
// `;

// const Option = styled.div`
//   display: block;
//   border: 0.1rem solid ${(props) => props.theme.color.primary};
//   border-radius: 1rem;
//   padding: 15px;
//   background-color: ${(props) => props.theme.color.lightGrayColor};
//   &:hover,
//   &:focus {
//     color: #546c84;
//     background-color: #fbfbfb;
//   }
//   & label {
//     cursor: pointer;
//   }
// `;
