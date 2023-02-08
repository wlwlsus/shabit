import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteVod } from '../../../services/admin/delete';
import { retrieveVods } from '../../../services/admin/get';

const VideoCard = ({
  thumbnail,
  categoryId,
  title,
  originalLength,
  videoId,
  vodsList,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    if (!isDeleting) return;
    setIsDeleting(false);
  }, [vodsList]);
  const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
  let categoryTag;
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
          {categoryTag}
          {videoLengthTag}
          <a href={videoURL} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </div>
      </div>
    </StyledCardWrapper>
  );
};

export default VideoCard;

const StyledCardWrapper = styled.div`
  a {
    margin-top: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: small;
  }
  a:hover {
    font-weight: bold;
  }
  .container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .card {
    position: relative;
    margin-bottom: 2rem;
    background-color: #fbfbfb;
    border-radius: 0.5rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    width: 12rem;
    height: 13rem;
  }
  .card-header img {
    width: 100%;
    height: 6rem;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    object-fit: cover;
  }
  .card-body {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
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
    background-color: #ff0000;
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
`;
