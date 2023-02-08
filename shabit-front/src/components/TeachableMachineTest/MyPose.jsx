import React, { useEffect, useRef, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';
import Loading from '../common/Loading';

const MyPose = ({
  isStarting,
  setIsStarting,
  timerIntervalId,
  savedIntevalId
}) => {

  let model, webcam ,ctx, maxPredictions;
  const canvasREF = useRef();

  //이전 데이터를 저장할 전역변수를 만듭니다.
  let prevMaxClass = '';
  let maxTime = '';
  let preparedLog = {};

  const [isLoading, setIsLoading] = useState(false); // 로딩중이면 스핀휠을 호출
  const [maxClassState, setMaxClassState] = useState(''); // 비율이 가장 높은 자세
  const [maxPredictionState, setMaxPredictionState] = useState(''); // 가장 높은 자세의 비율
  const [logArray, setLogArray] = useState([]); // 로그를 배열로 기록함.

  

  // TM: 정지 버튼을 눌렀을 때에 intervalID를 기준으로 loop함수를 중단합니다.
  async function onStop() {
    const jsonData = JSON.stringify(logArray);
    await localStorage.setItem('data', jsonData);
    await clearInterval(savedIntevalId.current);
    await clearInterval(timerIntervalId.current);
    await setIsStarting(false);
  }

  // TM: 웹캠을 설정하고 loop함수를 interval로 등록하며, intervalID를 반환합니다.
  async function init() {
    setIsLoading(true);
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(
      '/my_model/model.json',
      '/my_model/metadata.json',
    );
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    setIsLoading(false);

    savedIntevalId.current = setInterval(loop, 16);

    // append/get elements to the DOM
    const canvas = canvasREF.current;
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext('2d');
  }

  // TM: Predict 함수를 호출하는 함수입니다..
  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
  }

  // TM: 자세를 예측하고 콘솔을 찍습니다.
  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    //최대값을 저장할 변수를 선언합니다.
    let maxClass = '';
    let maxPrediction = 0;

    for (let i = 0; i < maxPredictions; i++) {
      //렌더링을 진행하는 알고리즘에 최대값 비교를 추가하였습니다.
      if (prediction[i].probability.toFixed(2) > maxPrediction) {
        //probability가 가장 큰 값이 maxPrediction에 저장되며 그 클래스명이 maxClass에 저장됩니다.
        maxPrediction = prediction[i].probability.toFixed(2);
        maxClass = prediction[i].className;
      }
    }
    // TODO: 알람으로 바꿔야함
    // //콘솔을 찍는 알고리즘입니다. -> 알람으로 바꿔야함
    // //전역변수와 비교하여 maxClass값이 변경되었을 경우,
    // //혹은 maxPrediction값이 0.1 이상 바뀌거나 1에 도달한 경우에 로그를 남깁니다.
    if (prevMaxClass !== maxClass && maxPrediction >= 0.7) {
      const now = new Date();
      const timeArray = [
        now.getFullYear().toString(),
        '-',
        (now.getMonth() + 1).toString().padStart(2, '0'),
        '-',
        now.getDate().toString().padStart(2, '0'),
        ' ',
        now.getHours().toString().padStart(2, '0'),
        ':',
        now.getMinutes().toString().padStart(2, '0'),
        ':',
        now.getSeconds().toString().padStart(2, '0'),
      ];
      const endTime = timeArray.join('');
      prevMaxClass = maxClass;
      setMaxClassState(maxClass);
      setMaxPredictionState(maxPrediction);
      console.log('새시간', endTime);
      console.log('헌시간', maxTime);
      if (endTime !== maxTime) {
        maxTime = endTime;
        if (!!Object.keys(preparedLog).length) {
          const newLog = {
            ...preparedLog,
            endTime,
          };
          setLogArray((logArray) => [newLog, ...logArray]);
        }
        preparedLog = {
          startTime: endTime,
          posture: maxClass,
        };

        console.log(logArray);
      }
    }

  }

  //컴포넌트가 마운트되면 TMpose를 실행합니다.
  useEffect(() => {
    if (isStarting) init();
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : <div></div>}
      {/* <div>Teachable Machine Pose Model</div>
      <button type="button" onClick={init}>
        Start
      </button>
      <div>{displayUsedTime} 총 이용 시간</div>
      <div>{displayRemainTime} 스트레칭까지 남은 시간</div>
      <div>스트레칭 횟수 : {strechingCount}</div>
      <button type="button" onClick={onStop}>
        Stop
      </button>
      <div>
        <canvas id="canvas" ref={canvasREF} />
        <div>{maxClassState}</div>
        <div>{maxPredictionState}</div>
        <div>
          {logArray.map(({ startTime, endTime, posture }, idx) => (
            <div key={idx}>
              {'posture:' +
                posture +
                'startTime :' +
                startTime +
                'endTime' +
                endTime}
            </div>
          ))}
        </div>
      </div>
      <div id="label-container" /> */}
    </div>
  );
};

export default MyPose;
