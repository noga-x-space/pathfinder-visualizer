import Header from "./PathFinderVisualizer/Header";
import PathFinderVisualizer from "./PathFinderVisualizer/PathFinderVisualizer";
import { useState } from "react";

function App() {
  const [starterOn, setStarterOn] = useState(false); // is the "setStart" button on?

  return (
    <>
      <Header
        projName={"Path Finder Visualizer"}
        starterOn={starterOn}
        setStarterOn={setStarterOn}
      />
      <PathFinderVisualizer starterOn={starterOn}></PathFinderVisualizer>
      hello
    </>
  );
}

export default App;
