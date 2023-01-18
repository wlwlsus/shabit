import { useRef, useState } from 'react';
import LandingTest from './components/authTest/LandingTest';
import TeachableMachine from './components/TeachableMachineTest/TeachableMachine';
import HeatMap from './components/UiTest/HeatMap';
import LineChart from './components/UiTest/LineChart';
import RangeBarDaily from './components/UiTest/RangeBarDaily';
// import UpdateDonutWeekly from './components/UiTest/UpdateDonutWeekly2';

function App() {
  const [isStarting, setIsStarting] = useState(false);
  const savedIntevalId = useRef();
  const wabcamStop = useRef();

  return (
    <div className="App">
      {isStarting ? (
        <TeachableMachine
          isStarting={isStarting}
          setIsStarting={setIsStarting}
          savedIntevalId={savedIntevalId}
          wabcamStop={wabcamStop}
        />
      ) : (
        <div></div>
      )}
      <button type="button" onClick={() => setIsStarting(true)}>
        start
      </button>
      <HeatMap />
      <LandingTest />
      <RangeBarDaily />
      {/* <UpdateDonutWeekly /> */}
      <LineChart />
    </div>
  );
}

export default App;
