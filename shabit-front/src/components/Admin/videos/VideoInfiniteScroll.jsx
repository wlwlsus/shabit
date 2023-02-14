import React, { useEffect, useRef, useState } from 'react';
import { retrieveVods } from '../../../services/admin/get';
import { useIntersection } from '../../../utils/useIntersection';

const VideoInfiniteScroll = ({ scrollProp, setScrollProp, vodsList }) => {
  const { page, category, length } = scrollProp;
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggered, setTriggered] = useState(true);

  const trigger = useRef();
  useIntersection(trigger, () => setTriggered(true));
  useEffect(() => {
    if (!triggered) return;
    if (isLastPage || isLoading) return setTriggered(false);
    retrieveVods(page, category, length).then((res) => {
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
  }, [category, length]);

  useEffect(() => {
    if (!page) {
      setIsLastPage(false);
      setIsLoading(false);
      setTriggered(true);
    }
  }, [page]);

  useEffect(() => {
    if (vodsList.length === 10) {
      retrieveVods(page, category, length).then((res) => {
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
