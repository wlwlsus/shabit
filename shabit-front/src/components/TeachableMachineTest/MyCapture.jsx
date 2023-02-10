import React,{useRef,useCallback,useEffect } from "react";
import Webcam from "react-webcam";
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setRecordedChunks} from '../../store/trackingSlice';

//10배속 다운로드만 구현하면 됨
const MyCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);//window
  const mediaRecorderRef = useRef(null);//viewRef
  const isRunning = useSelector((state) => {
    return state.time.isRunning;
  });
  console.log("isRUNNIGN",isRunning)
  const isStop = useSelector((state) => {
    return state.time.isStop;
  });
  var chunkData =[];
  let resumeId,pauseId;
  const videoConstraints = {
    height:400,
    width:850,
  }
  const pose =useSelector((state) => {
    return state.pose.pose;
  });
  
  // 캡쳐 시작
  const startCapture = useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
      chunkData = [...chunkData,event.data];
      dispatch(setRecordedChunks(chunkData));
    });

    mediaRecorderRef.current.start();  
    resumeId = setInterval(()=>{mediaRecorderRef.current.pause();},1000);
    //TODO:나중에 1분으로 수정해야됨
    pauseId = setInterval(()=>{mediaRecorderRef.current.resume();},3000);
  }, [webcamRef, mediaRecorderRef]);
  // 캡쳐할 때 필요  
  useEffect(()=>{
    if(isStop) stopCapture();
  },[isStop])

    // 방 나가기 클릭하면 -> 종료 버튼 누르고나면 
  const stopCapture = useCallback(() => {
    mediaRecorderRef.current.stop();
    clearInterval(resumeId);
    clearInterval(pauseId);
  }, [mediaRecorderRef, webcamRef]);
  
  return (
    <ContainerWrapper>
        <NoticeText>현재자세 : {pose}</NoticeText>
        <WebcamWrapper>
            <Webcam onUserMedia={startCapture}  audio={false} ref={webcamRef} mirrored={true} videoConstraints={videoConstraints}/>
        </WebcamWrapper>
    </ContainerWrapper>
  );
};
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  height:100%;
`;
const NoticeText = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.blackColor};
  font-weight: 100;
  margin-bottom:1rem;
`;
const ContainerNotice = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  margin:1rem 0 1rem 0;
  width: 40rem;
  height:3rem;
  padding:0.7rem 0.7rem 0.7rem 2rem;
  border-radius: 1.5rem 1.5rem 1.5rem 1.5rem;
  border: 1px solid ${(props) => props.theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
  color:${(props) => props.theme.color.primary};
  font-weight: 100;
`;

const WebcamWrapper = styled.div`
  border-radius: 1.5rem; 
  overflow: hidden;
  height:100%;
  width:100%;
`;

export default MyCapture;

// https://www.npmjs.com/package/react-webcam