
import HoursSummary from "./components/HoursSummary/HoursSummary";
import NewTask from "./components/NewTaskForm/NewTaskForm";
const App = () => {
  return (
    <div className="test">
      <div className="app-container">
      <HoursSummary />
    </div>
    <div className="app-container">
      <NewTask />
    </div>
    </div>
  );
};

export default App;
