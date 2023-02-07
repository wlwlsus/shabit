import React from 'react';
import styled from 'styled-components';
import { deletePhrase } from '../../../services/admin/delete';

const QuotesList = ({ quetesList }) => {
  return (
    <ListWrapper>
      {quetesList.map((element, idx) => {
        return (
          <div>
            <li key={String(idx) + Date().toString().slice(0, 3)}>{element}</li>
            <button
              onClick={() => {
                deletePhrase(element);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
    </ListWrapper>
  );
};

export default QuotesList;

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
