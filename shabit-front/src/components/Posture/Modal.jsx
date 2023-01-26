import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Modal({ setVideoURL }) {
  const [videoList, setVideoList] = useState(); // 비디오 리스트
  const [selected, setSelected] = useState(); // 유저가 선택한 비디오

  // 렌더링 후 비디오 리스트 가져옴
  useEffect(() => {
    axios({
      method: 'get',
      url: `/testData/videoData.json`,
    })
      .then((res) => {
        setVideoList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 비디오 URL 할당 => 재생
  const playVideo = () => {
    setVideoURL(`https://www.youtube.com/embed/${selected.videoId}`);
  };

  if (videoList) {
    return (
      <>
        {videoList.map((video, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setSelected(videoList[idx]);
              }}
            >
              <h4>{video.length}분</h4>
              <h3>{video.title}</h3>
              <img src={video.thumbnail} alt="thumbnail" />
            </div>
          );
        })}

        <button onClick={playVideo}>이거 선택할랭</button>
      </>
    );
  }
}
