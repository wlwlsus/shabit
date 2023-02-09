import React, { useEffect, useRef, useState } from 'react';
import { retrieveVods } from '../../../services/admin/get';
import { useIntersection } from '../../../utils/useIntersection';

const VideoInfiniteScroll = ({ scrollProp, setScrollProp }) => {
  const { page, search, query } = scrollProp;
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const trigger = useRef();
  useIntersection(trigger, () => setTriggered(true));
  useEffect(() => {
    if (!triggered) return;
    if (isLastPage || isLoading) return;
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
  }, [page]);

  return (
    <div>
      <p style={{ padding: '0.1rem' }}></p>
      <div ref={trigger}></div>
    </div>
  );
};

export default VideoInfiniteScroll;
