import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { HiChatAlt } from 'react-icons/hi';

//10배속 다운로드만 구현하면 됨
const MyCapture = ({ nickname }) => {
  const webcamRef = useRef(null); //window
  const mediaRecorderRef = useRef(null); //viewRef
  const recordedVideoRef = useRef(null); //recordedVideo

  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  let resumeId, pauseId;
  const videoConstraints = {
    height: 250,
    width: 380,
  };

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
    resumeId = setInterval(() => {
      mediaRecorderRef.current.pause();
    }, 1000);
    //TODO:나중에 1분으로 수정해야됨
    pauseId = setInterval(() => {
      mediaRecorderRef.current.resume();
    }, 3000);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );
  // 방 나가기 클릭하면
  const handleStopCaptureClick = useCallback(() => {
    clearInterval(resumeId);
    clearInterval(pauseId);

    // console.log(intervalId);
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.playbackRate = 10;
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, recordedChunks, setCapturing]);
  //play후 download이기 때문에
  const handlePlayRecorderVideo = useCallback(() => {
    console.log(recordedChunks);

    const blob = new Blob(recordedChunks, {
      type: 'video/webm',
    });
    recordedVideoRef.current.src = window.URL.createObjectURL(blob);
    recordedVideoRef.current.controls = true;
    recordedVideoRef.current.playbackRate = 10;
    recordedVideoRef.current.play();
  }, [recordedChunks]);
  //다운로드 여부 물어볼 때 클릭하면
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'MyVideo.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <ContainerWrapper>
      <ContainerNotice>
        <HiChatAlt />
        <NoticeText>현재 자세</NoticeText>
      </ContainerNotice>
      <ContainerHeader>{nickname}</ContainerHeader>
      <Container>
        <WebcamWrapper>
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored={true}
            videoConstraints={videoConstraints}
          />
        </WebcamWrapper>
        {/* {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <>
          <button onClick={handlePlayRecorderVideo}>Play
            <video autoPlay ref={recordedVideoRef} />
          </button>
          <button onClick={handleDownload}>Download</button>
          </>
        )} */}
      </Container>
    </ContainerWrapper>
  );
};
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NoticeText = styled.div`
  font-size: 1.25rem;
  color: ${(props) => props.theme.color.blackColor};
  font-weight: 100;
  margin-left: 1rem;
`;
const ContainerNotice = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  margin: 1rem 0 1rem 0;
  width: 40rem;
  height: 3rem;
  padding: 0.7rem 0.7rem 0.7rem 2rem;
  border-radius: 1.5rem 1.5rem 1.5rem 1.5rem;
  border: 1px solid ${(props) => props.theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: 100;
`;
const ContainerHeader = styled.div`
  width: 30rem;
  height: 3rem;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.primary};
  font-size: 1.5rem;
  font-weight: 600;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.color.whiteColor};
  width: 30rem;
  height: 18.75rem;
  border-radius: 0 0 1.5rem 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

// const InfoWrapper = styled.div`
//   background-color: ${(props) => props.theme.color.primary};
//   width: 100%;
//   height: 20%;
// `;
const WebcamWrapper = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  height: 80%;
  width: 80%;
`;

export default MyCapture;

// https://www.npmjs.com/package/react-webcam
