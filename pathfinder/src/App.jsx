import Header from "./PathFinderVisualizer/Header";
import PathFinderVisualizer from "./PathFinderVisualizer/PathFinderVisualizer";
import { useState } from "react";

function App() {
  const [starterOn, setStarterOn] = useState(true); // is the "setStart" button on?
  const [wallOn, setWallOn] = useState(false);
  const [goalOn, setGoalOn] = useState(false);
  return (
    <>
      <Header
        projName={"Path Finder Visualizer"}
        starterOn={starterOn}
        setStarterOn={setStarterOn}
        wallOn={wallOn}
        setWallOn={setWallOn}
        goalOn={goalOn}
        setGoalOn={setGoalOn}
      />
      <PathFinderVisualizer
        starterOn={starterOn}
        wallOn={wallOn}
        goalOn={goalOn}
      ></PathFinderVisualizer>
      hello
    </>
  );
}

export default App;
