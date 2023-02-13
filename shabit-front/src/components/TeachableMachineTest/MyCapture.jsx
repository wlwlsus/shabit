import React,{useRef,useCallback,useEffect } from "react";
import Webcam from "react-webcam";
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {setCapture, setRecordedChunks} from '../../store/trackingSlice';
import {postImage} from '../../services/info/post';

//10배속 다운로드만 구현하면 됨
const MyCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);//window
  const mediaRecorderRef = useRef(null);//viewRef

  const isStop = useSelector((state) => {
    return state.time.isStop;
  });
  const curPoseId = useSelector((state)=>{
    return state.pose.poseId;
  });
  const isRunning = useSelector((state) => {
    return state.time.isRunning;
  });

  var chunkData =[];
  let resumeId,pauseId;

  const videoConstraints = {
    height:400,
    width:850,
  }
  const curPose =useSelector((state) => {
    return state.pose.pose;
  });
  const userEmail = useSelector((state)=>{
    return state.auth.user.email;
  })
  const captureTiming = useSelector((state)=>{
    return state.tracking.capture;
  })
  const dataURLtoFile = (dataurl, fileName) => {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type:mime});
}
  // 캡쳐 시작
  const startCapture = useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
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
 
  const capturePose = useCallback((curPoseId,curPose)=>{
    var options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: false };
    const time =new Date().toLocaleTimeString("en-US", options);
    const imageSrc = webcamRef.current.getScreenshot();
    let poseId;
    if(curPoseId==0) poseId =1;
    else if(curPoseId ==3) poseId=2;
    else if(curPoseId == 1 || curPoseId==2) poseId =3;
    else poseId = 4;
    const file = dataURLtoFile(imageSrc,`${time} ${poseId}.jpg`)
    const formData = new FormData();
    formData.append('image',file,`${time} ${poseId}.jpg`);
    console.log(`${time} ${poseId}.jpg`);
    postImage(userEmail,formData);
    setCapture(false);
  },[webcamRef])

  useEffect(()=>{
    if(captureTiming) capturePose(curPoseId,curPose);
  },[captureTiming])

    // 방 나가기 클릭하면 -> 종료 버튼 누르고나면 
  const stopCapture = useCallback(() => {
    mediaRecorderRef.current.stop();
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    webcamRef.current.stream = null;
    clearInterval(resumeId);
    clearInterval(pauseId);
  }, [mediaRecorderRef, webcamRef]);

  return (
    <ContainerWrapper>
      {curPose?<><NoticeText>현재자세 : {curPose}</NoticeText>
       <WebcamWrapper>
       <Webcam onUserMedia={startCapture} audio={false} ref={webcamRef} mirrored={true} videoConstraints={videoConstraints}
       screenshotFormat="image/jpg" />
   </WebcamWrapper></>
   :<NoticeText>로딩중..잠시만 기다려주세요</NoticeText>}
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
  margin-left:1rem;
`;
const WebcamWrapper = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  height:100%;
  width:100%;
`;

export default MyCapture;