import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TiArrowSortedDown } from 'react-icons/ti';

const VideoInputDropbox = () => {
  const [Dropped, setDropped] = useState(false);
  const [selected, setSelected] = useState(1);
  const categoryArray = ['', '목', '허리', '전신'];
  const ref = useRef();
  useEffect(() => {
    setDropped(false);
  }, [selected]);

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
        <DropDownlist style={Dropped ? {} : { visibility: 'hidden' }}>
          {categoryArray.map((e, idx) => {
            if (!idx) return;
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
      </Selected>
    </DropdownWrapper>
  );
};

export default VideoInputDropbox;

const DropdownWrapper = styled.div`
  text-align: center;
  width: 8rem;
  height: 100%;
  z-index: 1;
  background-color: ${(props) => props.theme.color.secondary};
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  border: none;
  border-right: none;
  border-radius: 1rem 0 0 1rem;
  cursor: pointer;
`;

const Selected = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};
  span {
    position: absolute;
    display: flex;
    top: 1.6rem;
    left: 6.7rem;
    font-size: 1.1rem;
    align-items: center;
    transform: translateY(-50%);
    width: 1rem;
    opacity: 1;
    transition: 0.2s ease;
  }
`;

const DropDownlist = styled.div`
  margin-top: 80%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

const ListItem = styled.div`
  text-align: center;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 1rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  &:hover {
    background-color: ${(props) => props.theme.color.secondary};
  }
`;
