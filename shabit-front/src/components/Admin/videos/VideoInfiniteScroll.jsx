import React, { useCallback, useEffect, useRef, useState } from 'react';
import { retrieveVods } from '../../../services/admin/get';

import { useIntersection } from '../../../utils/useIntersection';

const VideoInfiniteScroll = ({ scrollProp, setScrollProp }) => {
  const { page, search, query } = scrollProp;
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggered, setTriggerd] = useState(false);
  // const [currentPage, setCurrentPage] = useState(page);
  const trigger = useRef();
  useIntersection(trigger, () => setTriggerd(true));
  useEffect(() => {
    if (!triggered) return;
    if (isLastPage || isLoading) return;
    retrieveVods(page, search, query).then((res) => {
      if (!res.length) setIsLastPage(true);
      setScrollProp({
        ...scrollProp,
        page: page + 1,
      });
      setTriggerd(false);
    });
  }, [triggered]);

  useEffect(() => {
    setIsLastPage(false);
    setIsLoading(false);
    setTriggerd(true);
  }, [search, query]);

  useEffect(() => {
    if (!page) setTriggerd(true);
  }, [page]);

  // const triggerCallback = useCallback(() => {
  //   alert(
  //     `'트리거' '페이지' ${currentPage} 'search', ${search}, '쿼리', ${query}`,
  //   );
  //   alert(`'로딩중?', ${isLoading}, '마지막페이지?', ${isLastPage}`);
  //   if (isLoading || isLastPage) return;
  //   isLoading = true;
  //   retrieveVods(currentPage, search, query).then((res) => {
  //     console.log(res);
  //     if (res.length === 0) setIsLastPage(true);
  //     currentPage= currentPage + 1);
  //     // page = page + 1;
  //     isLoading = false;
  //   });
  // }, [search, query, isLastPage]);
  // const triggerCallback = () => {
  //   alert(
  //     `'트리거' '페이지' ${currentPage} 'search', ${search}, '쿼리', ${query}`,
  //   );
  //   alert(`'로딩중?', ${isLoading}, '마지막페이지?', ${isLastPage}`);
  //   if (isLoading || isLastPage) return;
  //   isLoading = true;
  //   retrieveVods(currentPage, search, query).then((res) => {
  //     console.log(res);
  //     if (res.length === 0) setIsLastPage(true);
  //     currentPage = currentPage + 1;
  //     // page = page + 1;
  //     isLoading = false;
  //   });
  // };
  // useIntersection(trigger, triggerCallback);
  // useEffect(() => {
  //     currentPage = 0;
  //     triggerCallback();
  //   },
  //   [search, query]
  //   )

  // const triggerCallback = () => {
  //   alert(
  //     `'트리거' '페이지' ${currentPage} 'search', ${search}, '쿼리', ${query}`,
  //   );
  //   alert(`'로딩중?', ${isLoading}, '마지막페이지?', ${isLastPage}`);
  //   if (isLoading || isLastPage) return;
  //   isLoading = true;
  //   retrieveVods(currentPage, search, query).then((res) => {
  //     console.log(res);
  //     if (res.length === 0) setIsLastPage(true);
  //     // setPage(page + 1);
  //     setCurrentPage(currentPage + 1);
  //     isLoading = false;
  //   });
  // };

  /*
  {
    "message": "영상 리스트 조회를 성공하였습니다",
    "count": 0,
    "result": []
  }
  */
  // useIntersection(trigger, () => {
  //   if (isLastPage || isLoading) return;
  //   setIsLoading(true);
  //   데이터가져오기명령().then((res) => {
  //     const result = res.result;
  //     if (!result.length) return setIsLastPage(true);
  //     dispatch(스테이트에결과푸쉬하기);
  //     setPage(page + 1);
  //     setIsLoading(false);
  //   });
  // });

  return (
    <div>
      <p style={{ padding: '10rem' }}></p>
      <div ref={trigger}></div>
    </div>
  );
};

export default VideoInfiniteScroll;
