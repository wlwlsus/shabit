import LandingTest from './components/authTest/LandingTest';
// import HeatMap from './components/UiTest/HeatMap';
import LineChart from './components/UiTest/LineChart';
import RangeBarDaily from './components/UiTest/RangeBarDaily';
// import UpdateDonutWeekly from './components/UiTest/UpdateDonutWeekly2';

function App() {
  return (
    <div className="App">
      {/* <HeatMap /> */}
      <LandingTest />
      <RangeBarDaily />
      {/* <UpdateDonutWeekly /> */}
      <LineChart />
    </div>
  );
}

export default App;
