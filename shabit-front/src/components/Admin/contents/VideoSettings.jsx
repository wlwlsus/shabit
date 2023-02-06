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

  return (
    <VodWrapper>
      <PostWrapper>
        <form>
          <select
            name="categoryInput"
            id="categoryInput"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          >
            <option value="1">목 스트레칭</option>
            <option value="2">허리 스트레칭</option>
            <option value="3">전신 스트레칭</option>
          </select>

          <input
            type="text"
            name="urlInput"
            placeholder="유튜브 URL을 입력하세요"
            onChange={(e) => {
              setUrlInput(e.target.value);
            }}
          ></input>

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
        </form>
      </PostWrapper>
      <ListWrapper>
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
              thumbnail={element.thumbnail}
              categoryId={element.categoryId}
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
  max-height: 15rem;
  max-width: 100%;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  overflow-x: hidden;
`;
const ListContainer = styled.li`
  display: flex;
`;

const PostWrapper = styled.div`
  position: sticky;
`;

const VodWrapper = styled.div`
  border: 0.2rem solid ${theme.color.secondary};
  border-radius: 1.5rem;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};

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
