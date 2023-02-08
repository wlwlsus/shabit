import React from 'react';
import styled from 'styled-components';
import { deletePhrase } from '../../../services/admin/delete';
import QuoteCard from './QuoteCard';

const QuotesList = ({ quetesList }) => {
  return (
    <ListWrapper>
      {/* {quetesList.map((element, idx) => {
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
      })} */}
      {quetesList.map((element, idx) => {
        return (
          <QuoteCard quote={element}></QuoteCard>
          // <div>
          //   <li key={String(idx) + Date().toString().slice(0, 3)}>{element}</li>
          //   <button
          //     onClick={() => {
          //       deletePhrase(element);
          //     }}
          //   >
          //     삭제
          //   </button>
          // </div>
        );
      })}
      <QuoteCard quote="엄청 긴 텍스트를 입력하면 어떻게 되는지 한번 확인을 해보고 싶어서 이렇게 하고 있어요 정말로 긴 텍스트를 이렇게 입력해볼 것입니다."></QuoteCard>
      <QuoteCard quote="엄청 긴 텍스트를 입력하면 어떻게 되는지 한번 확인을 해보고 싶어서 이렇게 하고 있어요 정말로 긴 텍스트를 이렇게 입력해볼 것입니다."></QuoteCard>
    </ListWrapper>
  );
};

export default QuotesList;

const ListWrapper = styled.div`
  /* border: 1px solid; */
  margin-top: 0.5rem;
  max-height: 17.6rem;
  /* padding-top: 4rem; */
  max-width: 90%;
  align-self: center;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  overflow-x: hidden;
  /* justify-content: space-between; */
  //스크롤바 숨기기 https://wooaoe.tistory.com/49
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
