import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { retreivePhrases } from '../../../services/admin/get';
import { typedUseSelector } from '../../../store';
import { useIntersection } from '../../../utils/useIntersection';
import QuoteCard from './QuoteCard';

const QuotesList = ({
  triggered,
  setTriggered,
  page,
  setPage,
  isLastPage,
  setIsLastPage,
}) => {
  const trigger = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const quetesList = typedUseSelector(
    (state) => state.admin.quetesList,
    shallowEqual,
  );

  useEffect(() => {
    if (!triggered || isLastPage || isLoading) return;
    setIsLoading(true);
    retreivePhrases(page).then((res) => {
      if (!res.length) setIsLastPage(true);
      setIsLoading(false);
      setTriggered(false);
      setPage(page + 1);
    });
  }, [triggered]);

  useIntersection(trigger, () => setTriggered(true));

  return (
    <ListWrapper>
      {quetesList.map((element, idx) => {
        return (
          <QuoteCard
            quote={element}
            key={element}
            setTriggered={setTriggered}
            setPage={setPage}
            setIsLastPage={setIsLastPage}
          ></QuoteCard>
        );
      })}
      <div ref={trigger} />
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
