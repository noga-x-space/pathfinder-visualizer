import Header from "./PathFinderVisualizer/Header";
import PathFinderVisualizer from "./PathFinderVisualizer/PathFinderVisualizer";
import { useState } from "react";

function App() {
  const [starterOn, setStarterOn] = useState(false); // is the "setStart" button on?
  const [isWall, setIsWall] = useState(false);
  return (
    <>
      <Header
        projName={"Path Finder Visualizer"}
        starterOn={starterOn}
        setStarterOn={setStarterOn}
        isWall={isWall}
        setIsWall={setIsWall}
      />
      <PathFinderVisualizer
        starterOn={starterOn}
        isWall={isWall}
        setIsWall={setIsWall}
      ></PathFinderVisualizer>
      hello
    </>
  );
}

export default App;
