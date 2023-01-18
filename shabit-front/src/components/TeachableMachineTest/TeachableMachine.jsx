import React, { useEffect, useRef, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import Loading from '../Loading';
// import useInterval from './useInterval';

const TeachableMachine = ({
  isStarting,
  setIsStarting,
  savedIntevalId,
  // webcamObject,
}) => {
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
  // the link to your model provided by Teachable Machine export panel
  // const URL = "./my_model/";
  let model, webcam, ctx, labelContainer, maxPredictions;
  const canvasREF = useRef();

  //이전 데이터를 저장할 전역변수를 만듭니다.
  let prevMaxClass = '';
  let prevMaxPrediction = 0;
  let maxTime = '';
  let preparedLog = {};
  let intervalID;
  // let webcamStop = {};
  let isRunning = true;

  const [isLoading, setIsLoading] = useState(false);

  const [maxClassState, setMaxClassState] = useState('');
  const [maxPredictionState, setMaxPredictionState] = useState('');
  const [logArray, setLogArray] = useState([]);

  async function onStop() {
    const jsonData = JSON.stringify(logArray);
    isRunning = false;
    await localStorage.setItem('data', jsonData);
    await clearInterval(savedIntevalId.current);
    // await webcamObject.current.stop();
    // await webcamStop();
    await setIsStarting(false);
    // await window.location.replace('/');
  }

  async function init() {
    // const modelURL = URL + "model.json";
    // const metadataURL = URL + "metadata.json";
    // const modelURL = "./model.json";
    // const metadataURL = "./metadata.json";
    setIsLoading(true);
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(
      '/my_model/model.json',
      '/my_model/metadata.json',
    );
    // model = await tmPose.loadFromFiles(modelData, metaData);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip

    await webcam.setup(); // request access to the webcam
    await webcam.play();
    // webcamObject.current = webcam;
    setIsLoading(false);
    // window.requestAnimationFrame(loop);
    // setTimeout(loop, 16);
    savedIntevalId.current = setInterval(loop, 16);

    // append/get elements to the DOM
    // const canvas = document.getElementById("canvas");
    const canvas = canvasREF.current;
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext('2d');
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) {
    //   // and class labels
    //   // labelContainer.appendChild(document.createElement("div"));
    // }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    // window.requestAnimationFrame(loop);
    // setInterval(console.log(window), 1000)
    // console.log(window)
    // 16.67ms = 60프레임 33.33ms = 30프레임
    // setTimeout(loop, 16);
  }

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
      const classPrediction =
        prediction[i].className + ': ' + prediction[i].probability.toFixed(2);

      //렌더링을 진행하는 알고리즘에 최대값 비교를 추가하였습니다.
      if (prediction[i].probability.toFixed(2) > maxPrediction) {
        //probability가 가장 큰 값이 maxPrediction에 저장되며 그 클래스명이 maxClass에 저장됩니다.
        maxPrediction = prediction[i].probability.toFixed(2);
        maxClass = prediction[i].className;
      }
      // labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // //콘솔을 찍는 알고리즘입니다.
    // //전역변수와 비교하여 maxClass값이 변경되었을 경우,
    // //혹은 maxPrediction값이 0.1 이상 바뀌거나 1에 도달한 경우에 로그를 남깁니다.
    // if (prevMaxClass !== maxClass || (Math.abs(prevMaxPrediction - maxPrediction > 0.1 )) || (prevMaxPrediction != 1 && maxPrediction == 1)) {
    if (prevMaxClass !== maxClass && maxPrediction >= 0.7) {
      const now = new Date();
      // const now = Date.now();
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
      // const newLog = endTime + ' ' + maxClass + ' ' + maxPrediction;
      prevMaxClass = maxClass;
      prevMaxPrediction = maxPrediction;
      setMaxClassState(maxClass);
      setMaxPredictionState(maxPrediction);
      // console.log(newLog);
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

        // setLogArray((logArray) => [newLog, ...logArray]);
        console.log(logArray);
      }
    }

    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  useEffect(() => {
    if (isStarting) init();
  }, []);
  return (
    <div>
      {isLoading ? <Loading /> : <div></div>}
      <div>Teachable Machine Pose Model</div>
      {/* <button type="button" onClick={init}>
        Start
      </button> */}
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
      {/* <div id="label-container" /> */}
    </div>
  );
};

export default TeachableMachine;
