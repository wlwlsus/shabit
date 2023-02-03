import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteVod } from '../../../services/admin/delete';
import { fetchVods, retrieveVods } from '../../../services/admin/get';
import { postVod } from '../../../services/admin/post';
import { typedUseSelector } from '../../../store';

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
    <div>
      <ul>
        {vodsList.map((element, idx) => {
          return (
            <ListContainer
              key={String(idx) + Date().toString().slice(0, 2)}
              styl
            >
              <img src={element.thumbnail} style={{ maxWidth: '4rem' }}></img>
              <div>제목: {element.title}</div>
              <div>영상길이: {element.originalLength}</div>
              <div>
                카테고리: {element.categoryId} {element.name}
              </div>
              <div>비디오ID: {element.videoId}</div>
              <button
                onClick={async () => {
                  await deleteVod(element.videoId);
                }}
              >
                삭제
              </button>
            </ListContainer>
          );
        })}
      </ul>
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
    </div>
  );
}

const ListContainer = styled.li`
  display: flex;
`;
