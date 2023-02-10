import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PhotoList from './PhotoList';
import { fetchPhoto } from '../../services/info/get';
// import { loadEffect } from '../../styles/animation';
// import { useSelector } from 'react-redux';

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from 'react-icons/bs';

export default function GalleryContent() {
  const [photoList, setPhotoList] = useState([]);
  const [pageLimit, setPageLimit] = useState([]);
  const [posture, setPosture] = useState(1);
  const [page, setPage] = useState(0);

  const user = JSON.parse(sessionStorage.getItem('user'));

  // const user = useSelector((state) => {
  //   return state.auth.user;
  // });

  useEffect(() => {
    if (!user.email) return;
    fetchPhoto(user.email, posture, page).then((res) => {
      setPhotoList(res.result);
      setPageLimit(res.count - 1);
    });
  }, [posture, page]);

  const changePosture = (posture) => {
    setPosture(posture);
    setPage(0);
  };

  const changePage = (value) => {
    let copy = page;
    if (value && page < pageLimit) {
      copy += 1;
    }
    if (!value && page > 0) {
      copy -= 1;
    }
    setPage(copy);
  };

  return (
    <Wrapper>
      <RadioWrapper>
        <Label htmlFor="1" onClick={() => changePosture(1)}>
          <Radio name="posture" id="1" defaultChecked />
          바른 자세
        </Label>
        <Label htmlFor="2" onClick={() => changePosture(2)}>
          <Radio name="posture" id="2" />
          거북목 자세
        </Label>
        <Label htmlFor="3" onClick={() => changePosture(3)}>
          <Radio name="posture" id="3" />
          비스듬한 자세
        </Label>
        <Label htmlFor="4" onClick={() => changePosture(4)}>
          <Radio name="posture" id="4" />
          누운 자세
        </Label>
      </RadioWrapper>
      <Content>
        <PhotoList photoList={photoList} />
      </Content>
      <Pagination>
        <IconWrapper>
          <BsFillArrowLeftSquareFill onClick={() => changePage(0)} /> 이전
        </IconWrapper>
        <IconWrapper>
          다음
          <BsFillArrowRightSquareFill onClick={() => changePage(1)} />
        </IconWrapper>
      </Pagination>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const RadioWrapper = styled.div`
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  align-self: flex-start;
  margin-left: 2rem;
  margin-bottom: 1rem;

  & > label {
    margin-right: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Label = styled.label``;

const Radio = styled.input.attrs({ type: 'radio' })`
  margin-right: 0.5rem;
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.color.secondary};

  &:checked {
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const Content = styled.div`
  width: 63rem;
  height: 27rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;

const Pagination = styled.div`
  width: 20%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  color: ${(props) => props.theme.color.primary};

  & > div {
    display: flex;
    align-items: center;

    & > svg {
      font-size: 1.3rem;
      margin: 0 0.5rem;
      transition: all 0.2s ease-in-out;

      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }
    }
  }
`;

const IconWrapper = styled.div``;
