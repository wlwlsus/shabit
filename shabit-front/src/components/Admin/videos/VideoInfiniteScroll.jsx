import React, { useEffect, useRef, useState } from 'react';
import { retrieveVods } from '../../../services/admin/get';
import { useIntersection } from '../../../utils/useIntersection';

const VideoInfiniteScroll = ({ scrollProp, setScrollProp, vodsList }) => {
  const { page, search, query } = scrollProp;
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const trigger = useRef();
  useIntersection(trigger, () => setTriggered(true));
  useEffect(() => {
    // alert(`트리거드${triggered} 라스트페이지${isLastPage} 로딩중${isLoading}`);
    if (!triggered) return;
    if (isLastPage || isLoading) return setTriggered(false);
    retrieveVods(page, search, query).then((res) => {
      if (!res.length) setIsLastPage(true);
      setScrollProp({
        ...scrollProp,
        page: page + 1,
      });
      setTriggered(false);
    });
  }, [triggered]);

  useEffect(() => {
    setIsLastPage(false);
    setIsLoading(false);
    setTriggered(true);
  }, [search, query]);

  useEffect(() => {
    if (!page) setTriggered(true);
    // console.log(page);
  }, [page]);

  useEffect(() => {
    if (vodsList.length === 10) {
      retrieveVods(page, search, query).then((res) => {
        if (!res.length) setIsLastPage(true);
        setScrollProp({
          ...scrollProp,
          page: page + 1,
        });
        setTriggered(false);
      });
    }
  }, [vodsList]);

  return (
    <div style={{ width: '100%' }}>
      <div ref={trigger}></div>
    </div>
  );
};

export default VideoInfiniteScroll;
