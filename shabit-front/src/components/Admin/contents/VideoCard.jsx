import React from 'react';
import styled from 'styled-components';

const VideoCard = ({
  thumbnail,
  categoryId,
  title,
  originalLength,
  videoId,
}) => {
  const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
  // const categoryTag = switch(Number(categoryId)) {
  //   case 1 :
  //     return (
  //       <span className="tag tag-teal"></span>
  //       )
  // }

  return (
    <StyledCardWrapper className="container">
      <div className="card">
        <div className="card-header">
          <img
            src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
            alt="rover"
          />
        </div>
        <div className="card-body">
          <span className="tag tag-teal">Technology</span>
          <span className="tag tag-purple">Popular</span>
          <h4>
            Why is the Tesla Cybertruck designed the way it is? The future can
            be scary, but there are ways to deal with that fear
          </h4>
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
  h4 {
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .container {
    display: flex;
    /* width: 1040px; */
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .card {
    margin: 0.5rem;
    /* background-color: #fff; */s
    background-color: #fbfbfb;
    border-radius: 1rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    /* overflow: hidden; */
    width: 12rem;
  }
  .card-header img {
    width: 100%;
    height: 6rem;
    /* height: 200px; */
    border-top-right-radius: 1rem;
    border-top-left-radius: 0.1rem;
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
    margin-right: 0.5rem;
    color: #fff;
    padding: 2px 10px;
    text-transform: uppercase;
    cursor: pointer;
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
