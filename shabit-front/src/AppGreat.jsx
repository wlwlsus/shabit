import { useRef, useState } from 'react';
import LandingTest from './components/authTest/LandingTest';
import LogoutButton from './components/authTest/LogoutButton';
import NotiTriggerTest from './components/authTest/NotiTriggerTest';
import ProfileForm from './components/authTest/ProfileForm';
import TeachableMachine from './components/TeachableMachineTest/TeachableMachine';
import HeatMap from './components/UiTest/HeatMap';
import LineChart from './components/UiTest/LineChart';
import RangeBarDaily from './components/UiTest/RangeBarDaily';

// import UpdateDonutWeekly from './components/UiTest/UpdateDonutWeekly2';

function App() {
  const [isStarting, setIsStarting] = useState(false);
  const savedIntevalId = useRef();
  const timerIntervalId = useRef();

  return (
    <div className="App">
      <NotiTriggerTest></NotiTriggerTest>
      <LogoutButton></LogoutButton>
      {isStarting ? (
        <TeachableMachine
          isStarting={isStarting}
          setIsStarting={setIsStarting}
          savedIntevalId={savedIntevalId}
          timerIntervalId={timerIntervalId}
          // webcamObject={webcamObject}
        />
      ) : (
        <button type="button" onClick={() => setIsStarting(true)}>
          start
        </button>
      )}
      <HeatMap />
      <LandingTest />
      <RangeBarDaily />
      {/* <UpdateDonutWeekly /> */}
      <LineChart />
      <ProfileForm />
    </div>
  );
}

export default App;
