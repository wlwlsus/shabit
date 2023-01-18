// import service from "../service/rooms";
import {useRef,useState} from 'react';
const recordedVideo = useRef();
const codecPreferences = useRef();

const [isStart,setIsStart] = useState(false);
const [isRecord,setIsRecord] = useState(false);
const [recordedBlobs,setRecordedBlobs] = useState([]);

function stopRecording() {
    mediaRecorder.stop();
  }
  function pauseRecording(){
    mediaRecorder.pause();
  }
const clickRecord = ()=>{
    setIsRecord(!isRecord);
    if (recordButton.textContent === 'Start Recording') {
        startRecording();
      } else {
        pauseRecording();
        recordButton.textContent = 'Start Recording';
        playButton.disabled = false;
        downloadButton.disabled = false;
        codecPreferences.disabled = false;
      }
}
const clickStop = ()=>{
    stopRecording();
} 
const clickPlay = ()=>{
    const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(';', 1)[0];
    const superBuffer = new Blob(recordedBlobs, {type: mimeType});
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.play();
};
const clickDownload =()=>{
    const blob = new Blob(recordedBlobs, {type: 'video/webm'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
}
function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
    //   recordedBlobs.push(event.data);
        setRecordedBlobs(recordedBlobs.push(event.data));
    }
}
  
function getSupportedMimeTypes() {
    const possibleTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac',
    ];
    return possibleTypes.filter(mimeType => {
      return MediaRecorder.isTypeSupported(mimeType);
    });
}


function startRecording() {
    //if(recordedBlobs)
    //recordedBlobs = [];
    const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
    const options = {mimeType};
  
    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
      return;
    }
  
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.textContent = 'Pause Recording';
    playButton.disabled = true;
    downloadButton.disabled = true;
    codecPreferences.disabled = true;
    mediaRecorder.onstop = (event) => {
      console.log('Recorder paused: ', event);
      console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
 }

 function handleSuccess(stream) {
    recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;
  
    const gumVideo = document.querySelector('video#gum');
    gumVideo.srcObject = stream;
  
    getSupportedMimeTypes().forEach(mimeType => {
      const option = document.createElement('option');
      option.value = mimeType;
      option.innerText = option.value;
      codecPreferences.appendChild(option);
    });
    codecPreferences.disabled = false;
 }
  
  //연결 - WebRTC API 사용 
  async function init(constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      console.error('navigator.getUserMedia error:', e);
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
  }
const clickStart = async ()=>{
    setIsStart(!isStart);
    const constraints = {
        audio: {
          echoCancellation: {exact: hasEchoCancellation}
        },
        video: {
          width: window.outerWidth, height: window.outerHeight
        }
    };
    await init(constraints);
}
const RoomPage=()=>{
    return(
        <Container>
            <Video playsline autoplay muted></Video>
            <RecordedVideo ref={recordedVideo} playsline loop></RecordedVideo>
            <Buttons>
                <StartButton onClick={clickStart} disabled={!isStart}>Start Camera</StartButton>
                <RecordButton onClick={clickRecord} disabled={isRecord}>Start Recording</RecordButton>
                <PlayButton onClick={clickPlay} disabled={isRecord}>Play Recording</PlayButton>
                <StopButton onClick={clickStop} disabled={!isRecord}></StopButton>
                <DownloadButton onClick={clickDownload} disabled={isRecord}></DownloadButton>
            </Buttons>
            <Format>
                <CodecPreferences ref={codecPreferences}></CodecPreferences>
            </Format>
            <Error>
                <ErrorMsg></ErrorMsg>
            </Error>
        </Container>
    )
}

const Container = styled.div``;
const Video = styled.video`
    width: 1800px;
`;
const RecordedVideo = styled.video``;
const Buttons = styled.div``;
const StartButton = styled.button``;
const RecordButton = styled.button``;
const PlayButton = styled.button``;
const DownloadButton = styled.button``;
const Format = styled.div``;
const CodecPreferences = styled.select``;
const Error = styled.div``;
const ErrorMsg = styled.span``;

export default RoomPage;