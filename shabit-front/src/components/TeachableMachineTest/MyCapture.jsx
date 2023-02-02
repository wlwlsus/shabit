import React,{useRef,useState,useCallback } from "react";
import Webcam from "react-webcam";
import styled from 'styled-components';

//10배속 다운로드만 구현하면 됨
const MyCapture = () => {
  const webcamRef = useRef(null);//window
  const mediaRecorderRef = useRef(null);//viewRef
  const recordedVideoRef = useRef(null);//recordedVideo

  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoConstraints = {
    width: 360,
    height: 360,
  };
  let resumeId,pauseId;

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    resumeId = setInterval(()=>{
    mediaRecorderRef.current.pause();},1000);
    //TODO:나중에 1분으로 수정해야됨
    pauseId = setInterval(()=>{mediaRecorderRef.current.resume();},3000);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
    // 방 나가기 클릭하면
  const handleStopCaptureClick = useCallback(() => {
    
    clearInterval(resumeId);
    clearInterval(pauseId);

    // console.log(intervalId);
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.playbackRate = 10;
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef,recordedChunks, setCapturing]);
  //play후 download이기 때문에
  const handlePlayRecorderVideo=useCallback(()=>{
    console.log(recordedChunks);

      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      recordedVideoRef.current.src = window.URL.createObjectURL(blob);
      recordedVideoRef.current.controls = true;
      recordedVideoRef.current.playbackRate = 10;
      recordedVideoRef.current.play();
    
  },[recordedChunks]);
  //다운로드 여부 물어볼 때 클릭하면
  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "MyVideo.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);


  return (
    <Wrapper>
      <InfoWrapper>
        <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} mirrored={true}/>
      </InfoWrapper>
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <>
        <button onClick={handlePlayRecorderVideo}>Play
          <video autoPlay ref={recordedVideoRef} />
          {/* <canvas width="160" height="96" ref={canvasRef}>캔버스</canvas> */}
        </button>
        <button onClick={handleDownload}>Download</button>
        </>
      )}
      
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4rem 0 2rem 0;
`;
export default MyCapture;

// https://www.npmjs.com/package/react-webcam