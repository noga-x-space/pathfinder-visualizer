import Header from "./PathFinderVisualizer/Header";
import PathFinderVisualizer from "./PathFinderVisualizer/PathFinderVisualizer";
import { useState } from "react";
import StarAlgorithem from "./PathFinderVisualizer/StarAlgorithem";

function App() {
  const [starterOn, setStarterOn] = useState(true); // is the "setStart" button on?
  const [wallOn, setWallOn] = useState(false);
  const [goalOn, setGoalOn] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [result, setResult] = useState(null); // Store the algorithm result
  const [wallHistory, setWallHistory] = useState([]); //an array of all of the walls added to the grid
  const [index, setIndex] = useState(0); //the index of the wallHistory array, for undo and redo purposes

  // const [startCol, setStartCol] = useState(null);
  // const [startRow, setStartRow] = useState(null);

  const runAlgorithm = () => {
    // Here you can pass grid and start point to StarAlgorithem
    // Optionally, store the result in state or log it

    if (nodes.length > 0 && startNode) {
      const result = (
        <StarAlgorithem grid={[...nodes]} start={startNode}></StarAlgorithem>
      );
      setResult(result);
    }
  };

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
        runAlgorithm={runAlgorithm}
        wallHistory={wallHistory}
        setIndex={setIndex}
        index={index}
        nodes={nodes}
        setNodes={setNodes}
      />
      <PathFinderVisualizer
        starterOn={starterOn}
        wallOn={wallOn}
        goalOn={goalOn}
        nodes={nodes}
        setNodes={setNodes}
        setStartNode={setStartNode}
        startNode={startNode}
        wallHistory={wallHistory}
        setWallHistory={setWallHistory}
        // startCol={startCol}
        // setStartCol={setStartCol}
        // startRow={startRow}
        // setStartRow={setStartRow}
        index={index}
        setIndex={setIndex}
      ></PathFinderVisualizer>
      hello
    </>
  );
}

export default App;
