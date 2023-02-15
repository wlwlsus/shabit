import React, { useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCapture, setRecordedChunks } from '../../store/trackingSlice';
import { postImage } from '../../services/info/post';
import { setVideoSetting } from '../../store/modeSlice';

// posture page에 배치하고 어떻게 배치해야할지 모르겟음
const MyCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null); //window
  const mediaRecorderRef = useRef(null); //viewRef

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

  const videoConstraints = {
    height: 500,
    width: 800,
  };
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
      // setSetting(true);
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
      let poseId;
      if (curPoseId === 0) poseId = 1;
      else if (curPoseId === 3) poseId = 2;
      else if (curPoseId === 1 || curPoseId === 2) poseId = 3;
      else poseId = 4;
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

    //TODO:나중에 1분으로 수정해야됨
    pauseId = setInterval(() => {
      mediaRecorderRef.current.resume();
    }, 3000);
  }, [webcamRef, mediaRecorderRef]);

  const onResume = useCallback(() => {
    mediaRecorderRef.current.resume();

    resumeId = setInterval(() => {
      mediaRecorderRef.current.pause();
    }, 1000);

    //TODO:나중에 1분으로 수정해야됨
    pauseId = setInterval(() => {
      mediaRecorderRef.current.resume();
    }, 3000);
  }, [webcamRef, mediaRecorderRef]);

  useEffect(() => {
    if (videoSetting && mode === 'startLive') onResume();
    if (mode === 'stopLive') onStop();
    else if (mode === 'pausedLive') onPause();
    else if (mode === 'stretching') onPause();
  }, [mode]);

  useEffect(() => {
    if (captureTiming) capturePose(curPoseId, curPose);
  }, [captureTiming]);

  const resize = {
    width: '47%',
    height: '60%',
    position: 'absolute',
    right: '3%',
    top: '25%',
    borderRadius: '1rem',
  };

  return (
    <ContainerWrapper>
      {curPose ? (
        <WebcamWrapper style={stretchingMode ? resize : null}>
          <Webcam
            onUserMedia={init}
            audio={false}
            ref={webcamRef}
            mirrored={true}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpg"
          />
        </WebcamWrapper>
      ) : (
        <NoticeText>로딩중..잠시만 기다려주세요</NoticeText>
      )}
    </ContainerWrapper>
  );
};
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
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
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MyCapture;
