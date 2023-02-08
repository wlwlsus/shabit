import React from 'react';
import styled from 'styled-components';
import QuoteCard from './QuoteCard';

const QuotesList = ({ quetesList }) => {
  return (
    <ListWrapper>
      {quetesList.map((element, idx) => {
        return <QuoteCard quote={element} key={idx + Date()}></QuoteCard>;
      })}
    </ListWrapper>
  );
};

export default QuotesList;

const ListWrapper = styled.div`
  margin-top: 0.5rem;
  max-height: 17.6rem;
  max-width: 99%;
  align-self: center;
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  overflow-x: hidden;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
