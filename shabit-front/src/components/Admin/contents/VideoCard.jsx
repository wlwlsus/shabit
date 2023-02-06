import React, { useState } from 'react';
import styled from 'styled-components';
import { deleteVod } from '../../../services/admin/delete';
import { retrieveVods } from '../../../services/admin/get';

const VideoCard = ({
  thumbnail,
  categoryId,
  title,
  originalLength,
  videoId,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
  let categoryTag;
  // console.log(categoryId);
  switch (categoryId) {
    case 1:
      categoryTag = (
        <span
          className="tag tag-teal"
          onClick={() => retrieveVods('', 'category', '1')}
        >
          목 스트레칭
        </span>
      );
      break;
    case 2:
      categoryTag = (
        <span
          className="tag tag-purple"
          onClick={() => retrieveVods('', 'category', '2')}
        >
          허리 스트레칭
        </span>
      );
      break;
    case 3:
      categoryTag = (
        <span
          className="tag tag-pink"
          onClick={() => retrieveVods('', 'category', '3')}
        >
          전신 스트레칭
        </span>
      );
      break;
    default:
      categoryTag = <div></div>;
  }

  let videoLengthTag;
  const lengthArray = originalLength.split(':');
  const originalMinuite = Number(lengthArray[0]);
  const originalLengthText =
    lengthArray[0] + '분' + lengthArray[1].padStart(2, '0') + '초';

  if (originalMinuite < 4) {
    videoLengthTag = (
      <span
        className="tag tag-time-dark-verdun"
        onClick={() => retrieveVods('', 'length', '3')}
      >
        {originalLengthText}
      </span>
    );
  } else if (originalMinuite < 8) {
    videoLengthTag = (
      <span
        className="tag tag-time-deep-sea"
        onClick={() => retrieveVods('', 'length', '5')}
      >
        {originalLengthText}
      </span>
    );
  } else if (originalMinuite < 12) {
    videoLengthTag = (
      <span
        className="tag tag-time-indian-sunset"
        onClick={() => retrieveVods('', 'length', '10')}
      >
        {originalLengthText}
      </span>
    );
  } else {
    videoLengthTag = <div>{originalLengthText}</div>;
  }
  // switch (originalMinuite) {
  //   case originalMinuite < 4:
  //     videoLengthTag = (
  //       <span className="tag tag-time-dark-verdun">{originalLength}</span>
  //     );
  //     break;
  //   case originalMinuite < 8:
  //     videoLengthTag = (
  //       <span className="tag tag-time-deep-sea">{originalLength}</span>
  //     );
  //     break;
  //   case originalMinuite < 12:
  //     videoLengthTag = (
  //       <span className="tag tag-time-indian-sunset">{originalLength}</span>
  //     );
  //     break;
  //   default:
  //     videoLengthTag = <div>디폴드</div>;
  // }
  // console.log(typeof originalMinuite, videoLengthTag);
  // // const categoryClass = switch(categoryId)

  // thumbnail,
  // categoryId,
  // title,
  // originalLength,
  // videoId,

  return (
    <StyledCardWrapper className="container">
      <div className="card">
        {!isDeleting ? (
          <span className="tag delete-tag" onClick={() => setIsDeleting(true)}>
            삭제하기
          </span>
        ) : (
          <div>
            <span
              className="tag delete-tag"
              style={{
                right: '2.7rem',
                top: '0.3rem',
                backgroundColor: '#ffa200',
              }}
              onClick={() => {
                deleteVod(videoId);
                setIsDeleting(false);
              }}
            >
              삭제
            </span>
            <span
              className="tag delete-tag"
              style={{
                right: '0.1rem',
                top: '0.3rem',
                backgroundColor: '#cccccc',
              }}
              onClick={() => setIsDeleting(false)}
            >
              취소
            </span>
          </div>
        )}
        <div className="card-header">
          <img src={thumbnail} alt={categoryId} />
        </div>
        <div className="card-body">
          {/* <span className="tag tag-teal">Technology</span> */}
          {categoryTag}
          {videoLengthTag}
          {/* <h4>{title}</h4> */}
          <a href="https://www.google.com" target="_blank">
            {title}
          </a>
        </div>
      </div>
    </StyledCardWrapper>
  );
};

export default VideoCard;

const StyledCardWrapper = styled.div`
  /* 템플릿출처: https://codepen.io/eyupucmaz/pen/oNbeXOb */
  /* * {
    box-sizing: border-box;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background-color: #f7f8fc;
    font-family: 'Roboto', sans-serif;
    color: #10182f;
  } */
  /* h4 {
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: small;
  } */
  a {
    margin-top: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: small;
  }
  .container {
    display: flex;
    /* width: 1040px; */
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .card {
    position:relative;
    /* margin-left: 0.8rem; */
    /* margin-top: 0.5rem */
    margin-bottom: 2rem;
    /* background-color: #fff; */s
    background-color: #fbfbfb;
    border-radius: 0.5rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    /* overflow: hidden; */
    width: 12rem;
    height: 13rem;
  }
  .card-header img {
    width: 100%;
    height: 6rem;
    /* height: 200px; */
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    /* border-radius: 1rem; */
    object-fit: cover;
  }
  .card-body {
    /* display: flex; */
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    /* min-height: 250px; */
  }

  .tag {
    background: #cccccc;
    border-radius: 50px;
    font-size: x-small;
    margin-right: 0.3rem;
    color: #fff;
    padding: 0.1rem 0.5rem;
    text-transform: uppercase;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .delete-tag {
    position: absolute;
    /* margin-left: 8.8rem; */
    background-color: #ff0000;
    /* top: 2rem; */
    right: 0.2rem;
    top: 0.3rem;
    display: none;
  }
  &:hover .delete-tag {
    display: flex;
  }
  .tag-teal {
    background-color: #47bcd4;
  }
  .tag-purple {
    background-color: #5e76bf;
  }
  .tag-pink {
    background-color: #cd5b9f;
  }
  .tag-time-dark-verdun {
    background-color: #1d454c;
  }
  .tag-time-deep-sea {
    background-color: #386168;
  }
  .tag-time-indian-sunset {
    background-color: #dabd78;
  }

  .card-body p {
    font-size: 13px;
    margin: 0 0 40px;
  }
  /* .user {
    display: flex;
    margin-top: auto;
  }

  .user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .user-info h5 {
    margin: 0;
  }
  .user-info small {
    color: #545d7a;
  } */
`;
