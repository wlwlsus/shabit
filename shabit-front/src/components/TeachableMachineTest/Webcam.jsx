import React, { useRef, useCallback, useEffect,useState } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCapture, setRecordedChunks } from '../../store/trackingSlice';
import { postImage } from '../../services/info/post';
import { setVideoSetting } from '../../store/modeSlice';
import poseIdConvert from '../../utils/poseIdConvert';
import useDetectClose from "../../utils/useDetectClose"
import {useNavigate} from 'react-router-dom'

const MyCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null); //window
  const mediaRecorderRef = useRef(null); //viewRef
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  const [dropIsOpen, dropRef, dropHandler] = useDetectClose(false);
  const navigate = useNavigate();

  const stretchingMode = useSelector((state) => {
    return state.video.stretchingMode;
  });

  const curPoseId = useSelector((state) => {
    return state.pose.poseId;
  });

  const mode = useSelector((state) => {
    return state.mode.mode;
  });

  const videoSetting = useSelector((state) => {
    return state.mode.videoSetting;
  });

  var chunkData = useSelector((state) => {
    return state.tracking.recordedChunks;
  });
  let resumeId, pauseId;

  const curPose = useSelector((state) => {
    return state.pose.pose;
  });
  const userEmail = useSelector((state) => {
    return state.auth.user.email;
  });
  const captureTiming = useSelector((state) => {
    return state.tracking.capture;
  });

  // 캡쳐 시작
  const init = useCallback(() => {
    if (videoSetting === false) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        chunkData = [...chunkData, event.data];
        dispatch(setRecordedChunks(chunkData));
      });
      dispatch(setVideoSetting(true));
    }
    onStart();
  }, [webcamRef, mediaRecorderRef]);

  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const capturePose = useCallback(
    (curPoseId, curPose) => {
      var options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      };
      const time = new Date().toLocaleTimeString('en-US', options);
      const imageSrc = webcamRef.current.getScreenshot();
      let poseId = poseIdConvert(curPoseId);
      const file = dataURLtoFile(imageSrc, `${time} ${poseId}.jpg`);
      const formData = new FormData();
      formData.append('image', file, `${time} ${poseId}.jpg`);
      postImage(userEmail, formData);
      setCapture(false);
    },
    [webcamRef],
  );

  // 방 나가기 클릭하면 -> 종료 버튼 누르고나면
  const onStop = useCallback(() => {
    mediaRecorderRef.current.stop();
    // mediaRecorderRef.stop();
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    webcamRef.current.stream = null;
    clearInterval(resumeId);
    clearInterval(pauseId);
  }, [mediaRecorderRef, webcamRef]);

  const onPause = useCallback(() => {
    if (mediaRecorderRef.current.state !== 'paused') {
      mediaRecorderRef.current.pause();
    }
    clearInterval(resumeId);
    clearInterval(pauseId);
  }, [mediaRecorderRef]);

  const onStart = useCallback(() => {
    mediaRecorderRef.current.start();
    // mediaRecorderRef.start();
    resumeId = setInterval(() => {
      mediaRecorderRef.current.pause();
    }, 1000);

    pauseId = setInterval(() => {
      mediaRecorderRef.current.resume();
    }, 60000);
  }, [webcamRef, mediaRecorderRef]);

  const onResume = useCallback(() => {
    mediaRecorderRef.current.resume();

    resumeId = setInterval(() => {
      mediaRecorderRef.current.pause();
    }, 1000);

    pauseId = setInterval(() => {
      mediaRecorderRef.current.resume();
    }, 60000);
  }, [webcamRef, mediaRecorderRef]);

    const handleDevices = useCallback((mediaDevices) => {
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
      },[setDevices]
    );

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },[handleDevices]);

  useEffect(() => {
    if (videoSetting && mode === 'startLive') onResume();
    if (mode === 'stopLive') onStop();
    else if (mode === 'pausedLive') onPause();
    else if (mode === 'stretching') onPause();
  }, [mode]);

  useEffect(() => {
    if (captureTiming) capturePose(curPoseId, curPose);
  }, [captureTiming]);
  const handleErr=()=>{
    alert("카메라를 허용해야 사용할 수 있습니다");
    navigate('/main')
  }
  const resize = {
    width: '47%',
    height: '60%',
    position: 'absolute',
    right: '3%',
    top: '25%',
    borderRadius: '1rem',
  };

  return (
    <>
    <DropDownWrapper>
    {(devices.length>1&&!stretchingMode) && (
         <DropDown>
           <DropBtn onClick={dropHandler} ref={dropRef}>카메라 선택</DropBtn>
           <DropDownContent isDropped={dropIsOpen}>
             <ItemUl>
               {devices.map((device, key) => (
                 <Item
                   key={device.deviceId}
                   onClick={() => setDeviceId(device.deviceId)}
                 >
                   {device.label || `Device ${key + 1}`}
                 </Item>
               ))}
               </ItemUl>
           </DropDownContent>
         </DropDown>) }
     </DropDownWrapper>
    <ContainerWrapper>
      {curPose ? (
        <>
        
          <WebcamWrapper style={stretchingMode ? resize : null}>
          <Webcam
            onUserMedia={init}
            onUserMediaError={handleErr}
            audio={false}
            ref={webcamRef}
            mirrored={true}
            videoConstraints={{deviceId}}
            screenshotFormat="image/jpg"
          />
        </WebcamWrapper>
          </>
      ) : (
        <NoticeText>로딩중..잠시만 기다려주세요</NoticeText>
      )}
    </ContainerWrapper>
    </> 
  );
};
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  height: 80%;
`;
const NoticeText = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.blackColor};
  font-weight: 100;
  margin-left: 1rem;
`;

const WebcamWrapper = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  width: 90%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DropDownWrapper = styled.div`
  display:flex;
  justify-content:flex-end;
  width:70%;
  margin-top:0.7rem;
`;
const DropDown = styled.div`
  position: relative;
  text-align: center;
`;
const DropBtn = styled.button`
  cursor: pointer;
  padding:0.5rem;
  border: 2px solid ${(props) => props.theme.color.primary};
  border-radius : 0.5rem;
  display:flex;
  font-size:0.8rem;
  color:${(props) => props.theme.color.whiteColor};
  background-color: ${(props) => props.theme.color.primary};
  
  &:hover{
    background-color: ${(props) => props.theme.color.secondary};
    color:${(props) => props.theme.color.blackColor};
  }
`;
const DropDownContent = styled.div`
background: ${(props) => props.theme.color.secondary};
position: absolute;
top: 52px;
left: 50%;
width: 100px;
text-align: center;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
border-radius: 3px;
opacity: 0;
visibility: hidden;
transform: translate(-50%, -20px);
transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
z-index: 9;

&:after {
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 12px solid transparent;
  border-top-width: 0;
  border-bottom-color: ${(props) => props.theme.color.secondary};
}

${({ isDropped }) =>
  isDropped &&
  `
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
    left: 50%;
  `};
`;
const ItemUl = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }
  font-size:0.8rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.li``;
export default MyCapture;
