import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteVod } from '../../../services/admin/delete';

const VideoCard = ({
  thumbnail,
  categoryId,
  title,
  originalLength,
  videoId,
  vodsList,
  scrollProp,
  setScrollProp,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isDeleting) return;
    setIsDeleting(false);
  }, [vodsList]);
  const videoURL = `https://www.youtube.com/watch?v=`;

  let videoLengthTag;
  const lengthArray = originalLength.split(':');
  const originalMinuite = Number(lengthArray[0]);
  const originalLengthText =
    lengthArray[0] + '분' + lengthArray[1].padStart(2, '0') + '초';

  if (originalMinuite < 4) {
    videoLengthTag = (
      <span className="tag tag-time-dark-verdun">{originalLengthText}</span>
    );
  } else if (originalMinuite < 8) {
    videoLengthTag = (
      <span className="tag tag-time-deep-sea">{originalLengthText}</span>
    );
  } else if (originalMinuite < 12) {
    videoLengthTag = (
      <span className="tag tag-time-indian-sunset">{originalLengthText}</span>
    );
  } else {
    videoLengthTag = <div>{originalLengthText}</div>;
  }

  const moveToPage = (id) => {
    window.open(videoURL + id);
  }

  return (
    <StyledCardWrapper className="container">
      <div className="card">
        {!isDeleting ? (
          <DeleteButton className="tag delete-tag" 
          onClick={() => {
            setIsDeleting(true);
          }}>
            삭제하기
          </DeleteButton>
        ) : (
          <div>
            <DeleteButton
              className="tag delete-tag"
              style={{
                right: '2.7rem',
                top: '0.3rem',
                backgroundColor: '#ffa200',
              }}
              onClick={() => {
                deleteVod(videoId);
                setScrollProp({ ...scrollProp, page: 0 });
                setIsDeleting(false);
              }}
            >
              삭제
            </DeleteButton>
            <DeleteButton
              className="tag delete-tag"
              style={{
                right: '0.1rem',
                top: '0.3rem',
                backgroundColor: '#cccccc',
              }}
              onClick={() => setIsDeleting(false)}
            >
              취소
            </DeleteButton>
          </div>
        )}
        <CardContent onClick={() => moveToPage(videoId)}>
          <div className="card-header">
            <img src={thumbnail} alt={categoryId} />
          </div>
          <div className="card-body">
            {videoLengthTag}
            <div style={{ height: '70px', overflow: 'hidden' }}>
              <div style={{ display: '-webkit-box', whiteSpace: 'pre-wrap', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {title}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </StyledCardWrapper>
  );
};

export default VideoCard;

const StyledCardWrapper = styled.div`
  a {
    margin-top: 0.5rem;
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
    margin: 0.5rem 0.5rem;
    background-color: #fbfbfb;
    border-radius: 0.5rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    width: 12rem;
    height: 11rem;
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
    padding-top: 0.2rem;
  }

  .tag {
    position: absolute;
    top: 4.6rem;
    right: 0.2rem;
    background: #cccccc;
    border-radius: 50px;
    font-size: x-small;
    margin-right: 0.3rem;
    color: #fff;
    padding: 0.1rem 0.5rem;
    text-transform: uppercase;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
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
  .tag-time-dark-verdun {
    background-color: #ab9663;
  }
  .tag-time-deep-sea {
    background-color: #386168;
  }
  .tag-time-indian-sunset {
    background-color: #1d454c;
  }
  .card-body p {
    font-size: 13px;
    margin: 0 0 40px;
  }
`;

const DeleteButton = styled.span`
  cursor: pointer;
`;

const CardContent = styled.div`
  &:hover{
    cursor: pointer;
  }
`;