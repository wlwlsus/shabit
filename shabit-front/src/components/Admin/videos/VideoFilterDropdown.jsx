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
