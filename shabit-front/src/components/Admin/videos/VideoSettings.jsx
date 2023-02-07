import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteVod } from '../../../services/admin/delete';
import { fetchVods, retrieveVods } from '../../../services/admin/get';
import { typedUseSelector } from '../../../store';
import { theme } from '../../../styles/GlobalStyles';
import { loadEffect } from '../../common/animation';
import VideoCard from './VideoCard';
import VideoInput from './VideoInput';
import VideoList from './VideoList';

export default function VideoSettings() {
  useEffect(() => {
    retrieveVods();
  }, []);

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
      <>
        <Title>영상 추가</Title>
        <PostWrapper>
          <VideoInput />
        </PostWrapper>
      </>
      <>
        <ButtonContainer>
          <Title>영상 리스트</Title>
          <StyledButton
            onClick={() => {
              retrieveVods();
            }}
          >
            전체 불러오기
          </StyledButton>
        </ButtonContainer>
        <VideoList vodsList={vodsList} />
      </>
    </VodWrapper>
  );
}

const Title = styled.div`
  display: flex;
  align-items: center;
  align-self: start;
  margin-bottom: 0.5rem;
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  font-weight: bold;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${theme.color.primary};
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;

const ListContainer = styled.li`
  display: flex;
`;

const PostWrapper = styled.div`
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
`;

const TextDiv = styled.div`
  width: 30rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledButton = styled.button`
  margin-bottom: 0.5rem;
  background-color: ${theme.color.blueColor};
  color: ${theme.color.whiteColor};
  padding: 0.3rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: x-small;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
